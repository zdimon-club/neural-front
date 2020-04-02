import { Component, EventEmitter, Output, Input } from '@angular/core';
import {selectMessageNotificationsCount} from '../../../main/notifications/messages/store/messages.selector';
import {Store} from '@ngrx/store';
import {MessageNotificationState} from '../../../main/notifications/messages/store/messages.store';
import {Observable} from 'rxjs';
import {selectEventsCount} from '../../../main/notifications/events/store/events.selector';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['../header.component.scss', './header-mobile.component.scss'],
})
export class HeaderMobileComponent {
  @Output() openBurgerEmitter: EventEmitter<any> = new EventEmitter();
  @Output() toggleNotificationsEmitter: EventEmitter<any> = new EventEmitter();
  @Output() toggleMessagesEmitter: EventEmitter<any> = new EventEmitter();
  @Output() handleClickOutsideNotificationsEmitter: EventEmitter<any> = new EventEmitter();
  @Output() handleClickOutsideMessagesEmitter: EventEmitter<any> = new EventEmitter();

  @Input() user;
  @Input() is_auth;
  @Input() isHeaderSmall;
  @Input() isNotificationsOpened;
  @Input() isMessagesOpened;
  // cnt_messages: Observable<number>;
  // cnt_notifications: Observable<number>;
  //
  // constructor(private eventsStore: Store<MessageNotificationState>) {
  //   this.cnt_messages = this.eventsStore.select(selectMessageNotificationsCount);
  //   this.cnt_notifications = this.eventsStore.select(selectEventsCount);
  //
  // }
  openBurger() {
    this.openBurgerEmitter.emit();
  }
  toggleNotifications() {
    this.toggleNotificationsEmitter.emit();
  }
  toggleMessages() {
    this.toggleMessagesEmitter.emit();
  }
  handleClickOutsideNotifications() {
    this.handleClickOutsideNotificationsEmitter.emit();
  }
  handleClickOutsideMessages() {
    this.handleClickOutsideMessagesEmitter.emit();
  }
}
