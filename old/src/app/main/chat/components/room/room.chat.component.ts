import {
  SetCurrentRoom,
  SetAbonentCamera,
  ShowAbonentCamera,
  HideAbonentCamera,
} from './../../store/chat.action';
import { PhotoPopupComponent } from './../popup/photo.component';
import { VideoPopupComponent } from './../popup/video.component';
import { Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { Room, RoomState } from '../../store/chat.store';
import { select, Store } from '@ngrx/store';
import { getEmojiList, selectCurrentRoom,  } from '../../store/chat.selector';
import { Observable, Subscription } from 'rxjs';
import { SessionState } from '../../../../auth/store/session.store';
import { selectUser } from '../../../../auth/store/session.selector';
import { User } from '../../../users/store/users.store';
import { ChatService } from '../../services/chat.service';
import * as roomActions from '../../store/chat.action';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SocketService } from '../../../../socket/socket.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MediaService } from './../../services/media.service';
import { take } from 'rxjs/operators';

import { trigger, state, style, animate, transition } from '@angular/animations';

import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective,
} from 'ngx-perfect-scrollbar';
import { selectTimeCounter } from '../../store/stream.selector';
import { StreamState } from '../../store/stream.store';

import { dropMenuData } from './data/dropmenu-data';


@Component({
  selector: 'app-room-chat',
  templateUrl: './room.chat.component.html',
  styleUrls: ['./room.chat.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          width: '100%',
        }),
      ),
      state(
        'closed',
        style({
          width: '350px',
        }),
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class RoomChatComponent implements OnInit, OnDestroy {
  room: Room;
  current_user: User;
  $_current_user: Subscription;
  $_current_room: Subscription;
  $_update_room: Subscription;
  $_close_room: Subscription;
  room_id: number;
  room_subscribers: any;
  message = '';
  modalMenuShow = false;
  chat_visible = false;
  collapseControlMenu = window.outerWidth > 1366;
  public timeCounter$: Observable<number> = this.stream_store$.pipe(select(selectTimeCounter));
  is_abonent_video = false;
  is_my_video = false;
  public config: PerfectScrollbarConfigInterface = {};

  public smilesState = false;

  @Output() turn = new EventEmitter<boolean>();
  @Output() showSidebar = new EventEmitter();
  @Output() showCamera = new EventEmitter();
  @Output() showCameraEmit = new EventEmitter();
  @Output() toggleChat = new EventEmitter();
  @ViewChild('messagescontent', { static: false }) messagescontent: ElementRef;
  @ViewChild('chattextarea', { static: false }) chattextarea: ElementRef;
  dropMenuData = dropMenuData;

  constructor(
    private room_store: Store<RoomState>,
    private stream_store$: Store<StreamState>,
    private session_state: Store<SessionState>,
    private chat_service: ChatService,
    private router: Router,
    private route: ActivatedRoute,
    private socket_service: SocketService,
    public dialog: MatDialog,
    public media_service: MediaService,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.room_store.dispatch(new roomActions.SetCurrentRoom(this.route.snapshot.params['id']));
      }
    });
  }

  ngOnInit() {
    this.media_service._room_subscribers$.subscribe((data) => {
      this.room_subscribers = data;
    });

    this.$_current_room = this.room_store.select(selectCurrentRoom).subscribe((data) => {
      this.room = data;
      setTimeout(this.scrollToBottom, 500);
    });

    this.$_update_room = this.socket_service.update_room$.subscribe((data) => {
      this.room_store.dispatch(new roomActions.UpdateRoom(data.data.data));
    });

    this.$_close_room = this.socket_service.close_room$.subscribe((data) => {
      this.room_store.dispatch(new roomActions.CloseRoom(data.data.data));
      this.media_service.clearAllVideoTimers();
      this.hideAllAbonentsCameras();
    });

    this.$_current_user = this.session_state.select(selectUser).subscribe((data) => {
      this.current_user = data;
    });

    window.addEventListener('orientationchange', () => {
      this.collapseControlMenu = window.outerWidth > 1366;
    });

    window.addEventListener('resize', () => {
      this.collapseControlMenu = window.outerWidth > 1366;
    });

    this.room_store.select(getEmojiList)
      .pipe(
        take(5),
      )
      .subscribe(() => this.uploadEmoji());

    this.uploadEmoji();
    this.uploadStickers();
  }

  turnMyCamOn() {
    this.is_my_video = true;
    this.turn.emit(true);
  }

  turnMyCamOff() {
    this.is_my_video = false;
    this.turn.emit(false);
  }

  showVideo() {
    const dialogRef = this.dialog.open(VideoPopupComponent, {
      width: '450px',
      data: { room: this.room, user: this.current_user },
    });
  }

  showPhoto() {
    const dialogRef = this.dialog.open(PhotoPopupComponent, {
      width: '450px',
      data: { room: this.room, user: this.current_user },
    });
  }

  send() {

    if (this.message.length > 1) {
      const msg = {
        author: this.current_user,
        message: this.message,
        created: new Date(),
        room_id: this.room.id,
      };

      //
      this.chat_service.sendMessage(msg).subscribe((data) => {
        this.message = '';
        this.scrollToBottom();
      });
    } else {
      this.message = '';
    }
  }

  showModalMenu() {
    this.modalMenuShow = !this.modalMenuShow;
  }

  scrollToBottom = () => {
    try {
      this.messagescontent.nativeElement.scrollTop =
        this.messagescontent.nativeElement.scrollHeight + 300;
    } catch (err) {
    }
  };

  showAbonentCamera() {
    this.showCamera.emit(true);
    const data = { abonent: this.room.abonent, room: this.room };
    this.media_service.cameraShow(data).subscribe((rez) => {
      // this.media_service.joinToSession(this.room.abonent['token']);
      this.room_store.dispatch(
        new ShowAbonentCamera({ abonent_id: this.room.abonent.id, room_id: this.room.id }),
      );
      this.is_abonent_video = true;
      this.room_store.dispatch(new SetAbonentCamera({ room_id: this.room.id, value: true }));
    });
  }

  public hideAbonentCamera(subscriber: any) {
    this.showCamera.emit(false);
    const data = { abonent: this.room.abonent, room: this.room };
    this.media_service.cameraHide(data).subscribe((rez) => {
      this.media_service.deleteSubscriber(subscriber);
      this.is_abonent_video = false;
      this.room_store.dispatch(new SetAbonentCamera({ room_id: this.room.id, value: false }));
    });
  }

  public hideAllAbonentsCameras() {
    for (const property in this.media_service.subscribers) {
      if (this.media_service.subscribers.hasOwnProperty(property)) {
        this.media_service.deleteSubscriber(this.media_service.subscribers[property]);
      }
    }
  }

  showChatSidebar() {
    this.showSidebar.emit(true);
  }

  onClickedOutside(e: Event) {
    this.modalMenuShow = false;
  }

  public uploadEmoji(): void {
    this.room_store.dispatch(new roomActions.GetEmojiList());
  }

  public uploadStickers(): void {
    this.room_store.dispatch(new roomActions.GetStickersList());
  }

  public openSmilesMenu(): void {
    this.smilesState = !this.smilesState;
  }

  public addEmojiToMessage(emoji: string): void {
    this.message += emoji;
  }

  ngOnDestroy() {
    this.$_current_user.unsubscribe();
    this.$_current_room.unsubscribe();
    this.media_service.deleteSubscriber(this.room_subscribers[this.room.id]);
  }

  toggleChatChange() {

    // this.chat_visible = !this.chat_visible;
    // this.toggleChat.emit(this.chat_visible);
  }
}
