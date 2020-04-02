import { SoundService, SoundType } from './../services/sound.service';

import { SocketService } from './../../socket/socket.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  RoutesRecognized,
} from '@angular/router';


// store
import { selectCurrentRoom } from '../../main/chat/store/chat.selector';
import { Store } from '@ngrx/store';
import { RoomState } from '../../main/chat/store/chat.store';
import { SessionState } from '../../auth/store/session.store';
import * as sessionActions from '../../auth/store/session.action';
// snack bar alert
import { SnackbarService } from './../snackbar/snackbar.service';

@Injectable()
export class SmallChatService {

  public chatIsActive = new BehaviorSubject<boolean>(false);

  private room: any;

  constructor(
    router: Router,
    private socket_service: SocketService,
    private room_store: Store<RoomState>,
    private alert: SnackbarService,
    private sound_service: SoundService,
    private sessionStore: Store<SessionState>,
  ) {


    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        // console.log(event.url.indexOf('chat/room'));
        if (event.url.indexOf('chat/room') === -1) {
          this.chatIsActive.next(true);
          // this.sessionStore.dispatch(new sessionActions.SetUi({hide_footer: false, hide_header: false}));
        } else {
          this.chatIsActive.next(false);
          this.sessionStore.dispatch(new sessionActions.SetUi({ hide_footer: true, hide_header: false }));
        }
      }

    });

    // new message outsidethe current room

    this.socket_service.chat_message$.subscribe(data => {
      console.log('mark', data.data);
      const {
        abonent_id: abonentId, messages,
      }: {
        abonent_id: number, messages: any[]
      } = data.data.data;
      const authorId = messages[messages.length - 1].author_id;

      if (this.room === undefined) {
        this.showAlert(data.data.data);
      } else if (this.room.id !== data.data.data.id) {
        this.showAlert(data.data.data);
      }

      if (abonentId === authorId) {
        // this.sound_service.playMessage(SoundType.message);
      }
    });


    // current chat room

    this.room_store.select(selectCurrentRoom)
      .subscribe(data => {
        this.room = data;
      });

  }


  get chatOpened(): Observable<boolean> {
    return this.chatIsActive.asObservable();
  }

  /// show snack bar

  showAlert(data: any) {
    if (window.location.href.indexOf('chat/room') === -1) {
      this.alert.showToast(data);
    }
  }

}
