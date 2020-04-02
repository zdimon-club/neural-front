import { SoundService, SoundType } from './../../../core/services/sound.service';
import { Observable } from 'rxjs';


import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SocketService } from '../../../socket/socket.service';

import { Store } from '@ngrx/store';
// Events store
import { EventsState } from './../../../main/notifications/events/store/events.store';
import * as eventsActions from './../../../main/notifications/events/store/events.action';
import { selectEventsCount, selectEventsList } from './../../../main/notifications/events/store/events.selector';

import { selectCurrentRoom } from '../../../main/chat/store/chat.selector';
import { Room, RoomState } from '../../../main/chat/store/chat.store';
import * as eventNotificationsActions from '../../../main/notifications/events/store/events.action';

@Component({
  selector: 'app-notifications-menu',
  templateUrl: './notifications-menu.component.html',
  styleUrls: ['./notifications-menu.component.scss'],
})
export class NotificationsMenuComponent {
  @Input() user;
  @Input() isNotificationsOpened;
  @Input() isHeaderSmall;
  @Input() isMobile;
  @Output() clickTriangleEmitter: EventEmitter<any> = new EventEmitter();

  notificationsList: Observable<any>;
  private room: Room;
  cnt_notifications: Observable<number>;


  constructor(
    private socketService: SocketService,
    private eventsStore: Store<EventsState>,
    private sound_service: SoundService,
    private room_store: Store<RoomState>,
  ) {

    // current chat room

    this.room_store.select(selectCurrentRoom)
      .subscribe(data => {
        this.room = data;
      });

    /// Post comment
    this.socketService.feed_comment$.subscribe((data: any) => {
      const payload = {
        id: data.data.data.id,
        object_id: data.data.data.id,
        type: 'post-comment',
        message: data.data.data.text,
        created: data.data.data.created_at,
        user_obj: data.data.data.commentator,
        user_id: data.data.data.commentator.id,
      };
      this.eventsStore.dispatch(new eventsActions.AddNewEvent(payload));
      this.sound_service.playMessage(SoundType.comment);
    });


    /// Add like
    this.socketService.like_add$.subscribe((data: any) => {
      // console.log(data);
      const payload = {
        id: data.data.data.post_id,
        object_id: data.data.data.post_id,
        type: 'like',
        message: 'I like it!!!!!',
        created: data.data.data.created_at,
        user_obj: data.data.data.user,
        user_id: data.data.data.user.id,
      };
      this.eventsStore.dispatch(new eventsActions.AddNewEvent(payload));
      this.sound_service.playMessage(SoundType.like);
    });

    /// Add subscription
    this.socketService.subscription_add$.subscribe((data: any) => {
      const payload = {
        id: data.data.data.id,
        object_id: data.data.data.id,
        type: 'subscription',
        message: 'I am subscribed to you!',
        created: data.data.data.created_at,
        user_obj: data.data.data.user_sub,
        user_id: data.data.data.user_sub.id
      };
      this.eventsStore.dispatch(new eventsActions.AddNewEvent(payload));
      this.sound_service.playMessage();
    });

    this.notificationsList = this.eventsStore.select(selectEventsList);
    this.cnt_notifications = this.eventsStore.select(selectEventsCount);
  }

  // notificationsList = [
  //   {
  //     name: 'Mary',
  //     age: 27,
  //     text: 'posted a new photo, see it first',
  //     id: 1,
  //   },
  //   {
  //     name: 'Mary',
  //     age: 27,
  //     text: 'has a birthday today, give her a present',
  //     id: 2,
  //   },
  //   {
  //     name: 'Mary',
  //     age: 27,
  //     text: 'appreciated your photo',
  //     photo: 'https://html5css.ru/css/img_lights.jpg',
  //     type: 'like',
  //     id: 3,
  //   },
  //   {
  //     name: 'Mary',
  //     age: 27,
  //     text: 'left a comment under your video',
  //     is_video: true,
  //     type: 'comment',
  //     photo: 'https://html5css.ru/css/img_lights.jpg',
  //     id: 4,
  //   },
  //   {
  //     name: 'Mary',
  //     age: 27,
  //     text: 'Your agent wrote to you',
  //     type: 'write',
  //     id: 5,
  //   },
  // ];

  clickTriangle() {
    this.clickTriangleEmitter.emit();
  }

  readNotification(index: number, notificationId) {
    this.eventsStore.dispatch(new eventNotificationsActions.DeleteEventNotifications({index, notificationId}));
  }
}
