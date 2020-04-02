import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { SessionState } from '../../../auth/store/session.store';
import { selectUser, selectIsAuth } from '../../../auth/store/session.selector';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

// Register
import { RegistrationState } from '../../registration/store/registration.store';
import * as registrationActions from '../../registration/store/registration.action';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ChatService } from '../../chat/services/chat.service';
import { CatalogService } from '../../catalog/catalog.service';

@Component({
  selector: 'app-userlist-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserlistCardComponent implements OnDestroy {
  @Input() user;

  private unsubscribeAll: Subject<any>;
  isAuth: boolean;
  current_user: any;

  constructor(
    private session_store: Store<SessionState>,
    private router: Router,
    private chat_service: ChatService,
    private registration_store: Store<RegistrationState>,
    private matSnackBar: MatSnackBar,
    private catalog_service: CatalogService,
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

  callToChat(user_id): void {
    if (this.isAuth) {
      const data = {
        owner: this.current_user.id,
        abonent: user_id,
      };
      this.chat_service.addRoom(data).subscribe((res: any) => {
        this.router.navigate(['chat/room', res.id]);
      });
    } else {
      this.toggleRegistrationSuggestionPopup(true);
    }
  }

  toggleRegistrationSuggestionPopup(value) {
    this.registration_store.dispatch(
      new registrationActions.ToggleSuggestionPopup({ is_opened: value }),
    );
  }

  public handleSubscribe(user) {
    if (this.isAuth) {
      this.catalog_service.subscribe(user.id).subscribe((data: any) => {
        user.is_subscribed = true;
        this.matSnackBar.open(data.message, 'OK', {
          verticalPosition: 'top',
          duration: 2000,
        });
      });
    } else {
      this.toggleRegistrationSuggestionPopup(true);
    }
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
