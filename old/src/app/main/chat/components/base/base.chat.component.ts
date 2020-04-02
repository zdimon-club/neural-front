import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
/// OpenVidu
import { StreamManager } from 'openvidu-browser';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectUser } from '../../../../auth/store/session.selector';
/// Session Store
import { SessionState } from '../../../../auth/store/session.store';
import { SocketService } from '../../../../socket/socket.service';
// User store
import { User, UserState } from '../../../users/store/users.store';
//////////////
/// Services
import { ChatService } from '../../services/chat.service';
import * as roomActions from '../../store/chat.action';
import { getAllUserList, getContactUserList, getOnlineUserList, getRoomList } from '../../store/chat.selector';
/////////////
// Room store
import { Room, RoomState } from '../../store/chat.store';
import { SessionService } from './../../../../auth/session.service';
import { MediaService } from './../../services/media.service';








@Component({
  selector: 'app-base-chat',
  templateUrl: './base.chat.component.html',
  styleUrls: ['./base.chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BaseChatStageComponent implements OnInit, OnDestroy {

  online: Observable<any>;
  current_user: User;
  rooms: Observable<Room[]>;
  private _unsubscribeAll: Subject<any>;

  publisher: StreamManager; // Local
  is_video = false;
  is_loading = false;
  active_stream = true;
  sidebar_active = false;
  chat_visible = false;

  users_contact: Observable<User[]>;


  active_panel = 'favorites';
  public config: PerfectScrollbarConfigInterface = {};
  constructor(
    private router: Router,
    private user_store: Store<UserState>,
    private session_store: Store<SessionState>,
    private room_store: Store<RoomState>,
    private room_service: ChatService,
    private socket_service: SocketService,
    private media_service: MediaService,
    private session_service: SessionService,

  ) {

    this._unsubscribeAll = new Subject();

    // Set current user from store
    this.session_store.select(selectUser).subscribe(user => {
      this.current_user = user;
      // select rooms (contacts from the store)
      // this.rooms = this.room_store.select(getRoomList(this.current_user.id));
    });



    this.media_service._publisher$.subscribe((publisher: StreamManager) => {
      this.publisher = publisher;
    });
    this.media_service._isloading$.subscribe((data: boolean) => {
      this.is_loading = data;
    });

    this.room_store.dispatch(new roomActions.GetRoomList());
    this.room_store.dispatch(new roomActions.RequestFavoriteUsers());
    this.room_store.dispatch(new roomActions.RequestOnlineUsers());


  }

   ngOnInit() {

    // this.users_online = this.room_store.select(getOnlineUserList);
    this.users_contact = this.room_store.select(getAllUserList);


    this.socket_service.update_contacts$
     .pipe(takeUntil(this._unsubscribeAll))
     .subscribe(data => {
      this.room_store.dispatch(new roomActions.GetRoomList());
     });
     // console.log(this.room_store);
  }

  /*
    Call user from user online component
  */
  doCall(user: any) {
    const data = {
      owner: this.current_user,
      abonent: user
    };
    // this.room_store.dispatch(new roomActions.Add(data));
  }

  selectSidePanel(panel: string) {
    this.active_panel = panel;
    if (panel === 'online') {
      this.room_store.dispatch(new roomActions.RequestOnlineUsers());
      this.users_contact = this.room_store.select(getOnlineUserList);
    }
    if ( panel === 'favorites') {
      this.room_store.dispatch(new roomActions.RequestFavoriteUsers());
      this.users_contact = this.room_store.select(getContactUserList);
    }
    if (panel === 'all') {
      console.log('all');
      this.users_contact = this.room_store.select(getAllUserList);

    }
  }

  /*
  selectOnline(){
    this.room_service.getOnline().subscribe((res) =>{
      console.log(res);
      console.log(res);
    })
  }
  */

  doSelectRoom(user: Room) {
    // console.log(user);
    const data = {
      owner: this.current_user.id,
      abonent: user.id,
    };
    this.room_service.addRoom(data).subscribe((res: any) => {
      // console.log(res);
      // this.room_store.dispatch(new roomActions.SetCurrentRoom(res.id));
      this.room_store.dispatch(new roomActions.UpdateRoom(res));
      this.router.navigate(['chat/room', res.id]); 
    });
  }

  doTurn(data: boolean) {
    if (data) {
      this.is_video = true;
      this.media_service.getMedia();
    } else {
      this.is_video = false;
      this.media_service.disconect();
    }
  }

  showCamera(e) {
    this.active_stream = e;
  }

  showSidebar(e) {
    this.sidebar_active = e;
  }

  hideSidebar() {
    this.sidebar_active = false;
  }

  toggleChat(e) {
    this.chat_visible = e;
  }

  unplayModalMenu() {
    // if (this.is_video) {
    //  this.is_video = false;
    // }
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }



}
