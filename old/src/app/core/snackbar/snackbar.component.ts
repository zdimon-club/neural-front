

import {
  animate,
  keyframes, state, style,
  transition,
  trigger
} from '@angular/animations';
import { Component } from '@angular/core';

import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
// Room store
import {Room, RoomState} from '../../main/chat/store/chat.store';
import * as roomActions from '../../main/chat/store/chat.action';

/// Session Store
import { SessionState } from '../../auth/store/session.store';
import { SocketService } from '../../socket/socket.service';


import { ChatService } from './../../main/chat/services/chat.service';

// User store
import { User, UserState } from '../../main/users/store/users.store';
import { selectUser } from '../../auth/store/session.selector';



@Component({
  selector: 'snackbar-message-alert',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        opacity: 0
      })),
      transition('inactive => active', animate('300ms ease-out', keyframes([
        style({
          transform: 'translate3d(0, 100%, 0) skewX(0)',
          opacity: 0,
        }),
        style({
          transform: 'none',
          opacity: 1,
        }),
      ]))),
      transition('active => removed', animate('300ms ease-out', keyframes([
        style({
          opacity: 1,
        }),
        style({
          transform: 'translate3d(0, 100%, 0) skewX(0)',
          opacity: 0,
        }),
      ]))),
    ]),
  ],
  preserveWhitespaces: false,
})
export class SnackbarComponent extends Toast {

  current_user: User;

  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
    public router: Router,
    private room_store: Store<RoomState>,
    private room_service: ChatService,
    private session_store: Store<SessionState>
  ) {
    super(toastrService, toastPackage);
    if (this.message) {
      const msg: any = this.message;
      if (msg.length > 20) {
        this.message = msg.substr(0,20) + '...';
      }
    }
    this.session_store.select(selectUser).subscribe(user => {
      this.current_user = user;
    });
  }

  private action(event: Event): boolean {
    event.stopPropagation();
    this.toastPackage.triggerAction();
    return false;
  }

  public goToChat() {
    const data = {
      owner: this.current_user.id,
      abonent: this.options.titleClass,
    };
    console.log(data);
    this.room_service.addRoom(data).subscribe((res: any) => {
      this.room_store.dispatch(new roomActions.SetCurrentRoom(res.id));
      this.router.navigate(['chat/room', res.id]);
    });

    //this.router.navigate([`chat/room/${this.options.titleClass}`])
  }
}
