import { BillingService } from './main/billing/billing.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SmallChatService } from './core/small-chat/small-chat.service';
import { Observable } from 'rxjs';
import { ModalState } from './modal/store/modal.store';
import { Store } from '@ngrx/store';
import { SessionState } from './auth/store/session.store';
import { selectIsAuth } from './auth/store/session.selector';
import { OpenModal } from './modal/store/modal.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'front';
  isAuth = false;
  public chatOpened: Observable<boolean>;

  constructor(
    private _translateService: TranslateService,
    // private smallChatService: SmallChatService,
    private billing_service: BillingService,
    private session_store: Store<SessionState>,
    private modalStore$: Store<ModalState>,
  ) {
    // Set the default language
    this._translateService.setDefaultLang('en');
    // Use a language
    this._translateService.use('en');
    this.session_store.select(selectIsAuth).subscribe((value) => {
      this.isAuth = value;
    });
  }

  ngOnInit(): void {
    // open chat
    // this.chatOpened = this.smallChatService.chatIsActive;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
  }

  test() {
    this.modalStore$.dispatch(new OpenModal({
      title: 'title',
      type: 'default',
      content: 'content',
      buttons: [
        { title: 'navigate', link: '/', action: 'navigate', type: 'default' },
      ],
    }));
  }

  onModalEvent(e: string) {
    console.log('mark', e);
  }
}
