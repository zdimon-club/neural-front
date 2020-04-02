import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, timer, Subscribable, pipe, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment';

import { SocketIoConfig } from 'ngx-socket-io';

export const SOCKET_CONFIG: SocketIoConfig = {
  url: environment.socketUrl,
  options: { path: '/websocket' }
};
console.log(environment.socketUrl);
/// session store
import * as sessionActions from '../auth/store/session.action';
import { SessionState } from '../auth/store/session.store';
import { getSessionStateSelector, selectUser } from '../auth/store/session.selector';
////

/// User store
import { UserState, User } from '../main/users/store/users.store';
import { UpdateUsers } from '../main/users/store/users.action';

///
import { SessionService } from '../auth/session.service';
import { ReplaySubject } from 'rxjs';
// import { GalleryState } from '../store/gallery/gallery.store';
// import * as galleryActions from '../store/gallery/gallery.action';
// import { RoomState } from '../chat/store/chat.store';
// import * as roomActions from '../chat/store/chat.action';
// import { getRooms } from '../chat/store/chat.selector';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  user_online$: Observable<any> = this.socket.fromEvent<string>('server-action:update_user_online');

  ping$: Observable<any> = this.socket.fromEvent<string>('server-action:ping');
  get_offer$: Observable<any> = this.socket.fromEvent<string>('server-action:put_offer');
  get_answer$: Observable<any> = this.socket.fromEvent<string>('server-action:put_answer');
  get_ice$: Observable<any> = this.socket.fromEvent<string>('server-action:put_ice');
  update_session$: Observable<any> = this.socket.fromEvent<string>('server-action:update_session');
  show_billing_dialog$: Observable<any> = this.socket.fromEvent<string>(
    'server-action:show_billing_dialog',
  );
  update_room$: Observable<any> = this.socket.fromEvent<string>(
    'server-action:update_current_room',
  );

  close_room$: Observable<any> = this.socket.fromEvent<string>(
    'server-action:close_current_room',
  );

  // Chat
  chat_message$: Observable<any> = this.socket.fromEvent<string>('server-action:chat_message');
  update_contacts$: Observable<any> = this.socket.fromEvent<string>(
    'server-action:update_contacts',
  );


  /// Feed
  feed_comment$: Observable<any> = this.socket.fromEvent<string>('server-action:comment_add');

  /// Like
  like_add$: Observable<any> = this.socket.fromEvent<string>('server-action:like_add');

  /// Subscription
  subscription_add$: Observable<any> = this.socket.fromEvent<string>('server-action:add_subscription');

  show_cam$: Observable<any> = this.socket.fromEvent<string>('server-action:show_cam');
  hide_cam$: Observable<any> = this.socket.fromEvent<string>('server-action:hide_cam');


  ///// Moderation

  photo_moderation$: Observable<any> = this.socket.fromEvent<string>(
    'server-action:moderate:photo',
  );
  video_moderation$: Observable<any> = this.socket.fromEvent<string>(
    'server-action:moderate:video',
  );

  offer_emmiter$ = new ReplaySubject();
  answer_emmiter$ = new ReplaySubject();
  ice_emmiter$ = new ReplaySubject();

  // current_user: User;

  timer: any;

  constructor(
    private socket: Socket,
    // private online_service: OnlineService,
    private session_store: Store<SessionState>,
    // private gallery_store: Store<GalleryState>,
    private user_store: Store<UserState>,
    // private room_store: Store<RoomState>,
    private session_service: SessionService,
  ) {

    /// Moderation
    this.photo_moderation$.subscribe((data: any) => {
      console.log('Photo moderation');
      console.log(data);
      this.session_store.dispatch(new sessionActions.SetMainPhoto(data.data.data.get_small_url_square));
    });


    this.session_store.select(getSessionStateSelector);

    this.ping$.subscribe((data) => {
      this.socket.emit('ng-action', {
        action: 'pong',
        socket_id: socket.ioSocket.id,
        token: this.session_service.getToken(),
      });
    });

    this.user_online$.subscribe((data) => {
      // update gallery store
      if (data) {
        // set user
        this.user_store.dispatch(new UpdateUsers(data.user));
      }
    });

    this.get_offer$.subscribe((data: any) => {
      this.offer_emmiter$.next(data);
    });

    this.get_answer$.subscribe((data: any) => {
      this.answer_emmiter$.next(data);
    });

    this.get_ice$.subscribe((data: any) => {
      this.ice_emmiter$.next(data);
    });

    this.socket.on('connect', () => {
      this.session_service.setSid(socket.ioSocket.id);
      console.log('connnection update sid' + socket.ioSocket.id);
      this.session_store.dispatch(
        new sessionActions.SetSid({
          token: this.session_service.getToken(),
          socket_id: socket.ioSocket.id,
        }),
      );
    });
  }

  sendOffer(data: any) {
    const payload = { action: 'MESSAGE:sending-offer', data };
    this.socket.emit('ng-action', payload);
  }

  reconnect() {
    this.socket.disconnect();
    this.socket.connect();
  }
}
