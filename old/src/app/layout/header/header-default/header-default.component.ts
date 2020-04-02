
import { Observable } from 'rxjs';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';


import { Store } from '@ngrx/store';

// Events store
import { EventsState } from './../../../main/notifications/events/store/events.store';
import * as eventsActions from './../../../main/notifications/events/store/events.action';
import { selectEventsCount } from './../../../main/notifications/events/store/events.selector';

// Message notification store
import { MessageNotificationState } from './../../../main/notifications/messages/store/messages.store';
import * as messageNotificationActions from './../../../main/notifications/messages/store/messages.action';
import { selectMessageNotificationsCount } from './../../../main/notifications/messages/store/messages.selector';

@Component({
  selector: 'app-header-default',
  templateUrl: './header-default.component.html',
  styleUrls: ['../header.component.scss'],
})
export class HeaderDefaultComponent {
  @Output() showBillingEmitter: EventEmitter<any> = new EventEmitter();
  @Output() openBurgerEmitter: EventEmitter<any> = new EventEmitter();
  @Output() doLogoutEmitter: EventEmitter<any> = new EventEmitter();
  @Output() toggleNotificationsEmitter: EventEmitter<any> = new EventEmitter();
  @Output() toggleMessagesAlertEmitter: EventEmitter<any> = new EventEmitter();
  @Output() handleClickOutsideNotificationsEmitter: EventEmitter<any> = new EventEmitter();
  @Output() handleClickOutsideMessagesEmitter: EventEmitter<any> = new EventEmitter();
  @Output() searchEmmiter: EventEmitter<any> = new EventEmitter();

  @Input() user;
  @Input() is_auth;
  @Input() online;
  @Input() isHeaderSmall;
  @Input() isNotificationsOpened;
  @Input() isMessagesOpened;

  // TODO можно ли унести эти переменные внутрь менюшек ?
  cnt_notifications: Observable<number>;
  cnt_messages: Observable<number>;

  isDropdownOpened = false;

  constructor(
    private router: Router,
    private eventsStore: Store<EventsState>
    ) {
      this.cnt_notifications = this.eventsStore.select(selectEventsCount);
      this.cnt_messages = this.eventsStore.select(selectMessageNotificationsCount);
    }

  toggleDropdown() {
    this.isDropdownOpened = !this.isDropdownOpened;
  }

  handleClickOutsideDropdown() {
    if (this.isDropdownOpened) {
      this.isDropdownOpened = false;
    }
  }

  handleClickCloseDropdownAndNavigate(link) {
    this.isDropdownOpened = false;
    this.router.navigate(link);
  }

  toggleNotifications() {
    this.toggleNotificationsEmitter.emit();
  }

  toggleMessagesAlert() {
    this.toggleMessagesAlertEmitter.emit();
  }

  handleClickOutsideNotifications() {
    this.handleClickOutsideNotificationsEmitter.emit();
  }

  handleClickOutsideMessages() {
    this.handleClickOutsideMessagesEmitter.emit();
  }

  handleSearch(value){
    this.searchEmmiter.emit(value);
  }

  openBurger() {
    this.openBurgerEmitter.emit();
  }

  showBilling() {
    this.showBillingEmitter.emit();
  }

  doLogout() {
    this.isDropdownOpened = false;
    this.doLogoutEmitter.emit();
  }
}
