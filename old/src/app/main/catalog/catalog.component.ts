import { CatalogService } from './catalog.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

// store
import { User, UserState } from '../users/store/users.store';
import { selectGalleryUserList, selectUsersIDsList, getUsers } from '../users/store/users.selector';
import { UpdateUsers } from '../users/store/users.action';
import { SessionState } from '../../auth/store/session.store';
import { selectUser, selectIsAuth } from '../../auth/store/session.selector';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// services
import { ChatService } from '../chat/services/chat.service';
import { HelperService } from '../../core/services/helper.service';

import $ from 'jquery';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

import { MatDialog } from '@angular/material/dialog';
import { DetailPopupFeedComponent } from './../feed/detail/detail.popup.feed.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any>;
  is_popup_displayed = false;
  showNewEntries = false;

  users: any;
  isAuth: boolean;
  current_user: any;
  filter: any = {
    online: 'false',
    age_from: 'all',
    age_to: 'all',
  };
  masonry_options = {
    itemSelector: '.masonry__card',
    columnWidth: '.masonry__sizer',
    gutter: '.masonry__gutter',
    fitWidth: true,
  };

  constructor(
    private user_store: Store<UserState>,
    private catalog_service: CatalogService,
    private session_store: Store<SessionState>,
    private router: Router,
    private route: ActivatedRoute,
    private chat_service: ChatService,
    private matSnackBar: MatSnackBar,
    private helperService: HelperService,
    private dialog: MatDialog,
  ) {
    this.unsubscribeAll = new Subject();
    this.session_store
      .select(selectIsAuth)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((value) => {
        this.isAuth = value;
      });
    this.session_store
      .select(selectUser)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((user) => {
        this.current_user = user;
      });
  }

  ngOnInit() {
    const online = this.route.snapshot.paramMap.get('isOnline');
    if (online === 'true') {
      this.filter.online = 'true';
    }

    this.doGetList(this.filter);

    window.addEventListener('scroll', () => this.handleScrollWindowForButton());

    // this.initShowEntriesButton();
  }

  updateMasonry({ withImagesLoaded = true }) {
    const masonryNode = document.querySelector('#masonry');
    if (masonryNode !== null) {
      if (withImagesLoaded) {
        imagesLoaded(masonryNode, () => {
          const msnry = new Masonry(masonryNode, this.masonry_options);
        });
      } else {
        const msnry = new Masonry(masonryNode, this.masonry_options);
      }
    }

    setTimeout(() => {
      if (masonryNode !== null) {
        if (withImagesLoaded) {
          imagesLoaded(masonryNode, () => {
            const msnry = new Masonry(masonryNode, this.masonry_options);
          });
        } else {
          const msnry = new Masonry(masonryNode, this.masonry_options);
        }
      }
    }, 50);
  }

  initShowEntriesButton() {
    const button: HTMLElement = document.querySelector('.catalog__show-entries');
    const header: HTMLElement = document.querySelector('header');
    const headerOffset: number = header.getBoundingClientRect().top;
    const headerHeight: number = header.offsetHeight;

    // button.style.top = (headerOffset + headerHeight < 0 ? 0 : headerHeight + headerOffset + 'px').toString();
    window.addEventListener('scroll', () => {
      const _headerOffset: number = header.getBoundingClientRect().top;
      button.style.top = (_headerOffset + headerHeight < 0
        ? 0
        : headerHeight + _headerOffset + 'px'
      ).toString();
      // header.style.top = (_headerOffset + headerHeight < 0 ? 0 : headerHeight + _headerOffset + 'px').toString();
    });
  }

  doGetList(filter: any) {
    this.catalog_service.getList(filter).subscribe({
      next: (res: any) => {
        console.log(res.results);
        this.user_store.dispatch(new UpdateUsers(res.results));
        this.users = this.user_store.select(selectGalleryUserList(res.results)).pipe(
          map((r) => {
            // console.log('mark', r);
            setTimeout(() => this.updateMasonry({ withImagesLoaded: true }));
            return r;
          }),
        );
        this.user_store.select(selectGalleryUserList(res.results)).subscribe(() => {
          this.updateMasonry({ withImagesLoaded: true });
        });
      },
      complete: () => {
        this.updateMasonry({ withImagesLoaded: true });
      },
    });
  }

  public handleSubscribe(user) {
    this.catalog_service.subscribe(user.id).subscribe((data: any) => {
      user.is_subscribed = true;
      this.matSnackBar.open(data.message, 'OK', {
        verticalPosition: 'top',
        duration: 2000,
      });
    });
  }

  public handleUnSubscribe(user) {
    this.catalog_service.unSubscribe(user.id).subscribe((data: any) => {
      user.is_subscribed = false;
      this.matSnackBar.open(data.message, 'OK', {
        verticalPosition: 'top',
        duration: 2000,
      });
    });
  }

  handleOpenPopup(id) {
    this.router.navigate(['index/post', id]);
  }

  handleClosePopup() {
    this.router.navigate(['index']);
  }

  handleDisplayPopup($event) {
    this.is_popup_displayed = $event;
  }

  openFeed(feed: any) {
    this.dialog.open(DetailPopupFeedComponent, {
      panelClass: 'feed-dialog',
      data: { feed_id: feed.id },
    });
  }

  doFilter(event: any) {
    this.doGetList(event);
    this.router.navigate(['index/online', event.online]);
  }

  handleScrollButtonClick(e: any) {
    const btn = $('.button-go-top');
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
    setTimeout(() => btn.removeClass('active'), 300);
  }

  handleScrollWindowForButton() {
    const btn = $('.button-go-top');
    if ($(window).scrollTop() > 300) {
      btn.addClass('active');
      // btn.css('bottom', $('footer').outerHeight() + 20);
    } else {
      btn.removeClass('active');
    }
  }

  callToChat(user_id) {
    if (this.isAuth) {
      const data = {
        owner: this.current_user.id,
        abonent: user_id,
      };
      this.chat_service.addRoom(data).subscribe((res: any) => {
        this.router.navigate(['chat/room', res.id]);
      });
    } else {
      this.router.navigate(['login']);
    }
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
