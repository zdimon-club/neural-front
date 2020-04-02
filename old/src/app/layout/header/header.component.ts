import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

// import { navigation } from 'app/navigation/navigation';
import { LoginService } from '../../auth/login.service';

// store
import { Store } from '@ngrx/store';
import { SessionState } from '../../auth/store/session.store';
import { selectIsAuth, selectUser, selectOnline } from '../../auth/store/session.selector';
import * as sessionActions from '../../auth/store/session.action';
import { User } from '../../main/users/store/users.store';
import { SetLanguage } from '../../auth/store/session.action';

// rxjs
import { Subject, Subscribable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

// session
import { SessionService } from '../../auth/session.service';
import { SocketService } from '../../socket/socket.service';
import { HelperService } from '../../core/services/helper.service';

// popup
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BillingPopupComponent } from '../../main/billing/billing.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

// import { BillingService } from '../../main/billing/billing.service';
// import { SmallChatService } from '../../core/small-chat/small-chat.service';
import { Room, RoomState } from '../../main/chat/store/chat.store';
import { selectCurrentRoom } from '../../main/chat/store/chat.selector';
import { ToastrService } from 'ngx-toastr';

import { BillingService } from './../../main/billing/billing.service';

import $ from 'jquery';
import { MessageNotificationState } from '../../main/notifications/messages/store/messages.store';
import {
  RequestMessageNotifications,
} from '../../main/notifications/messages/store/messages.action';
import { RequestEventNotifications } from '../../main/notifications/events/store/events.action';
import { EventsState } from '../../main/notifications/events/store/events.store';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderNavbarComponent implements OnInit, OnDestroy {
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  selectedLanguage: any;
  is_auth: boolean;
  user: User;
  online = 0;
  isMobile = false;
  isNotificationsOpened = false;
  isMessagesOpened = false;
  private room: Room;
  public chatState: boolean;
  public chatDisabled: boolean;
  public costs: any[] = [];
  public isHeaderSmall = false;

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   *
   */
  constructor(
    private translateService: TranslateService,
    private loginService: LoginService,
    private sessionStore: Store<SessionState>,
    private roomStore: Store<RoomState>,
    private messageStore: Store<MessageNotificationState>,
    private eventStore: Store<EventsState>,
    private sessionService: SessionService,
    public dialog: MatDialog,
    private socketService: SocketService,
    private toastrService: ToastrService,
    private helperService: HelperService,
    private billingService: BillingService,
    // private smallChatService: SmallChatService,

    private router: Router,
  ) {
    this.languages = [
      {
        id: 'en',
        title: 'English',
        flag: 'us',
      },
      {
        id: 'ru',
        title: 'Russian',
        flag: 'ru',
      },
    ];

    // this.navigation = navigation;


    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  showBilling() {
    this.billingService.showDialog();
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.updateOnlineCnt();
    // Set the selected language from default languages

    this.selectedLanguage = _.find(this.languages, {
      id: this.translateService.currentLang,
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url.includes('chat/room/')) {
          // this.smallChatService.chatState.next(false);
        }
      });
    ////// chat
    /*
    this.smallChatService.chatOpened.subscribe(state => {
      this.chatState = state;
    });
    this.smallChatService.chatDisabled.subscribe(state => {
      this.chatDisabled = state;
    });
    */

    this.sessionStore
      .select(selectIsAuth)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((data) => {
        this.is_auth = data;
        if (data) {
          this.getMessageNotification();
          this.getEventNotification();
        }
      });

    this.sessionStore
      .select(selectUser)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((data) => {
        this.user = data;
      });

    this.socketService.update_session$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((data: any) => {
        this.sessionStore.dispatch(new sessionActions.UpdateUser(data.data.user));
      });

    this.socketService.user_online$.pipe(takeUntil(this.unsubscribeAll)).subscribe((data: any) => {
      this.updateOnlineCnt();
    });

    this.roomStore
      .select(selectCurrentRoom)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((data) => {
        this.room = data;
      });

    this.handleScrollHeader();

    this.checkMobile();
  }

  private getMessageNotification(): void {
    // TODO нужно добавлять в стору новых юзеров
    this.messageStore.dispatch(new RequestMessageNotifications());
  }

  private getEventNotification(): void {
    // TODO нужно добавлять в стору новых юзеров
    this.eventStore.dispatch(new RequestEventNotifications());
  }

  private updateOnlineCnt() {
    this.sessionService.getOnlineCnt().subscribe((data: any) => {
      this.online = data.online;
    });
  }

  public getCosts() {
    /*
    this.billingService.getCosts().subscribe((res: any) => {
      let results = [];
      if (res.results) {
        results = Object.keys(res.results).map(key => res.results[key]);
        results.forEach(result => {
          result.type = result.type.length > 27 ? result.type.substr(0, 27) + '...' : result.type;
        });
        this.costs = results;
      }
    });
    */
  }

  public toggleChatWindow() {
    /*
    if (this.room) {
      this.smallChatService.chatState.next(!this.chatState);
    } else {
      this.toastrService.warning('No open chats yet');
    }
    */
  }

  toggleNotifications() {
    this.isNotificationsOpened = !this.isNotificationsOpened;
  }

  toggleMessagesAlert() {
    this.isMessagesOpened = !this.isMessagesOpened;
  }

  handleClickOutsideNotifications() {
    if (this.isNotificationsOpened) {
      this.isNotificationsOpened = false;
    }
  }

  handleClickOutsideMessages() {
    if (this.isMessagesOpened) {
      this.isMessagesOpened = false;
    }
  }

  openBurger() {
    $('#menu').addClass('is-open');
    $('.overlay').addClass('is-active');
    $('body').addClass('overflow-hidden');
  }

  handleScrollHeader() {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300 && !this.isHeaderSmall) {
        this.isHeaderSmall = true;
      } else if (window.pageYOffset <= 300 && this.isHeaderSmall) {
        this.isHeaderSmall = false;
      } else {
        return false;
      }
    });
  }

  closeBurger() {
    if ($('#menu').hasClass('is-open')) {
      $('#menu').removeClass('is-open');
      $('.overlay').removeClass('is-active');
      $('body').removeClass('overflow-hidden');
    }
  }

  doLogout() {
    this.closeBurger();
    this.loginService.logout();
  }

  checkMobile() {
    this.isMobile = window.matchMedia('(max-width: 450px)').matches;
    window.addEventListener(
      'resize',
      () => (this.isMobile = window.matchMedia('(max-width: 450px)').matches),
    );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  /**
   * Search
   *
   *
   */
  handleSearch(value): void {
    // Do your search here...
    console.log(value);
  }

  /**
   * Set the language
   *
   *
   */
  setLanguage(lang): void {
    // Set the selected language for the toolbar
    this.selectedLanguage = lang;
    // Use the selected language for translations
    this.sessionStore.dispatch(new SetLanguage(lang.id));
    this.sessionService.setLanguage(lang.id);
    this.translateService.use(lang.id);
  }
}
