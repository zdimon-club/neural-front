import { SoundService, SoundType } from './../../../core/services/sound.service';
import { Observable } from 'rxjs';


import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SocketService } from '../../../socket/socket.service';

import { Store } from '@ngrx/store';
// Message Notifications store
import { MessageNotificationState } from './../../../main/notifications/messages/store/messages.store';
import * as messageNotificationsActions from './../../../main/notifications/messages/store/messages.action';
import {
  selectMessageNotificationsCount,
  selectMessageNotificationsList
} from './../../../main/notifications/messages/store/messages.selector';


import { selectCurrentRoom } from '../../../main/chat/store/chat.selector';
import { Room, RoomState } from '../../../main/chat/store/chat.store';

@Component({
  selector: 'app-messages-menu',
  templateUrl: './messages.menu.component.html',
  styleUrls: ['./messages.menu.component.scss'],
})
export class MessagesMenuComponent {
  @Input() user;
  @Input() isMessagesOpened;
  @Input() isHeaderSmall;
  @Input() isMobile;
  @Output() clickTriangleEmitter: EventEmitter<any> = new EventEmitter();

  notificationsList: Observable<any>;
  private room: Room;
  cnt_messages: Observable<number>;


  constructor(
    private socketService: SocketService,
    private eventsStore: Store<MessageNotificationState>,
    private sound_service: SoundService,
    private room_store: Store<RoomState>,
    private _socket_service: SocketService,
  ) {

    // current chat room

    this.room_store.select(selectCurrentRoom)
      .subscribe(data => {
        this.room = data;
      });

    this._socket_service.chat_message$.subscribe(data => {
      console.log('mark', data.data);
      // const {
      //   abonent_id: abonentId, messages,
      // }: {
      //   abonent_id: number, messages: any[]
      // } = data.data.data;
      // console.log(messages);
      // console.log(`abonent ${abonentId}`);
      // const authorId = messages[messages.length - 1].author_id;

      if (this.room === undefined || this.room.id !== data.data.data.id) {
        this._addMessageToStore(data.data.data);
      }

      // if (abonentId === authorId) {
      //  this.sound_service.playMessage(SoundType.message);
      // }
    });

    this.notificationsList = this.eventsStore.select(selectMessageNotificationsList);
    this.cnt_messages = this.eventsStore.select(selectMessageNotificationsCount);
  }


  _addMessageToStore(data) {
    console.log('adding message');
    // TODO глупо гнать всю комнату
    // TODO потянуть абонента с сервера и забросить в стору
    // this.profile_service.getProfileDetail(data.abonent_id).subscribe(
    const key = Object.keys(data.messages)[Object.keys(data.messages).length - 1];
    const lm = data.messages[key];
    const payload = {
      id: data.id,
      object_id: data.id,
      type: 'chat-message',
      message: lm.message,
      created: lm.created_at,
      user_obj: data.commentator,
      user_id: lm.author_id,
    };
    this.eventsStore.dispatch(new messageNotificationsActions.AddNewMessageNotification(payload));
  }


  clickTriangle() {
    this.clickTriangleEmitter.emit();
  }

  readNotification(index, notificationId) {
    this.eventsStore.dispatch(new messageNotificationsActions.DeleteMessageNotifications({index, notificationId}));
  }
}
