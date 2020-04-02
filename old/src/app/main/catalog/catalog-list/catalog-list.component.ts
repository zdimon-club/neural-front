import { Observable, of } from 'rxjs';
import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RegistrationState } from '../../registration/store/registration.store';
import { selectIsSuggestionPopupOpened } from '../../registration/store/registration.select';
import * as registrationActions from '../../registration/store/registration.action';
import { CatalogService } from './../catalog.service';
import { User } from '../../users/store/users.store';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss'],
})
export class CatalogListComponent implements  OnChanges {
  @Input() users: Observable<any>;
  @Input() isAuth: Observable<boolean>;
  @Output() subscribe: EventEmitter<any> = new EventEmitter();
  @Output() unSubscribe: EventEmitter<any> = new EventEmitter();
  @Output() openFeed: EventEmitter<any> = new EventEmitter();
  @Output() callToChat: EventEmitter<any> = new EventEmitter();
  @Output() openPopup: EventEmitter<any> = new EventEmitter();
  @Output() changes: EventEmitter<any> = new EventEmitter();

  isRegisterSuggestionPopupOpened = false;

  constructor(
    private registration_store: Store<RegistrationState>,
    private userStore: Store<User>,
    private catalog_service: CatalogService) {
    this.registration_store.pipe(select(selectIsSuggestionPopupOpened)).subscribe((value) => {
      this.isRegisterSuggestionPopupOpened = value;
    });
  }

  ngOnInit () {
    // this.showMockup();
  }

  // showMockup() {
  //   const MOCK_COUNT = 30;
  //   const results = {};
  //
  //   for(let i = 0; i < MOCK_COUNT; i++) results[i] = new User();
  //   this.users = of(Object.values(results));
  //   this.users.subscribe();
  //
  //   console.log('results', results);
  // }

  formatVideoTime(time) {
    const timeNumber: any = Number(time).toFixed(0);
    const minutes: number = Math.floor(timeNumber / 60);
    const formattedMinutes = minutes < 10 ? '0' + minutes : timeNumber;
    const seconds: number = timeNumber - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    return formattedMinutes && formattedSeconds
      ? `${formattedMinutes}:${formattedSeconds}`
      : '00:00';
  }

  handleClickLike(user): void {
    if (this.isAuth) {
      user.last_feed.is_liked = !user.last_feed.is_liked;
      const data = {
        obj_model: 'userfeed',
        obj_id: user.last_feed.id
      };
      this.catalog_service.addLike(data).subscribe((rez) => {
        console.log(rez);
      });

    } else {
      this.toggleRegistrationSuggestionPopup(true);
    }
  }

  emitSubscribe(user): void {
    if (this.isAuth) {
      this.subscribe.emit(user);
    } else {
      this.toggleRegistrationSuggestionPopup(true);
    }
  }

  emitUnSubscribe(user): void {
    this.unSubscribe.emit(user);
  }

  emitOpenFeed(userLastFeed): void {
    this.openFeed.emit(userLastFeed);
  }

  emitCallToChat(userId): void {
    if (this.isAuth) {
      this.callToChat.emit(userId);
    } else {
      this.toggleRegistrationSuggestionPopup(true);
    }
  }

  emitOpenPopup(id): void {
    
      this.openPopup.emit(id);
    
  }

  emitOnChanges(): void {
    this.changes.emit();
  }

  toggleRegistrationSuggestionPopup(value) {
    this.registration_store.dispatch(
      new registrationActions.ToggleSuggestionPopup({ is_opened: value }),
    );
  }

  ngOnChanges() {
    this.emitOnChanges();
  }
}
