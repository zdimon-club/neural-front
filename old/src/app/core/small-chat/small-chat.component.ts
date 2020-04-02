import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { SmallChatService } from './small-chat.service';
import { NgForm } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Room, RoomState } from '../../main/chat/store/chat.store';
import { User } from '../../main/users/store/users.store';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { SocketService } from '../../socket/socket.service';
import { selectCurrentRoom } from '../../main/chat/store/chat.selector';
import * as roomActions from '../../main/chat/store/chat.action';
import { ChatService } from '../../main/chat/services/chat.service';
import { selectUser } from '../../auth/store/session.selector';
import { SessionState } from '../../auth/store/session.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MediaService } from './../../main/chat/services/media.service';

@Component({
  selector: 'app-small-chat',
  templateUrl: './small-chat.component.html',
  styleUrls: ['./small-chat.component.scss']
})
export class SmallChatComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;
  room: Room;
  current_user: User;
  $_current_user: Subscription;
  $_current_room: Subscription;
  $_update_room: Subscription;
  room_id: number;
  message: string = '';
  smiles: any;

  is_collapsed: boolean = false;

  @ViewChild('messagescontent',{'static': false}) messagescontent: ElementRef;
  @ViewChild('chattextarea',{'static': false}) chattextarea: ElementRef;


  user: any;
  chat: any;
  replyInput: any;
  public userId = 1;
  room_subscribers: any;

  public messages = [];
  constructor(private smallChatService: SmallChatService,
              private chat_service: ChatService,
              private room_store: Store<RoomState>,
              private session_state: Store<SessionState>,
              public media_service: MediaService,
              private socket_service: SocketService) { 

    this._unsubscribeAll = new Subject();      
    this.media_service._room_subscribers$.subscribe((data) => {
      this.room_subscribers = data;
      // console.log(this.room_subscribers);
    })
  }

  ngOnInit() {
    this.$_current_room = this.room_store.select(selectCurrentRoom)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data =>{
      this.room = data;
      this.scrollToBottom();
  
    });

    this.chat_service.getSmiles()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
      this.smiles = data;
    });

    this.$_current_user = this.session_state.select(selectUser)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(data => {
      this.current_user = data;
    });


  }

  collapseChat(){
      this.is_collapsed = !this.is_collapsed;
  }

  public hideChat() {
    this.smallChatService.chatIsActive.next(false);
  }

  send(){
    let msg = {
      author: this.current_user,
      message: this.message,
      created: new Date(),
      room_id: this.room.id
    };

    //
    this.chat_service.sendMessage(msg).subscribe(data => {
      //this.room_store.dispatch(new roomActions.SendMessage(data));
      //this.room_store.dispatch(new roomActions.UpdateRoomMessages(data));
      //this.room_store.dispatch(new roomActions.UpdateRoom(data));
      this.message = '';
      // this.scrollToBottom();
    });

  }

  stopChat(){
    this.chat_service.stop(this.room.id).subscribe(data => {

    });
  }

  scrollToBottom = () => {
    if (this.messagescontent) {
      try {
        this.messagescontent.nativeElement.scrollTop =
          this.messagescontent.nativeElement.scrollHeight + 300;
      } catch (err) {}
    }
  };

  addSmile(smile: any){
    //console.log(smile);
    //console.log(this.chattextarea.nativeElement.value);
    this.message = this.message +' '+ smile.alias+' ';
  }

  ngOnDestroy(){
    //this.$_current_user.unsubscribe();
    //this.$_new_message.unsubscribe();
    //this.$_current_room.unsubscribe();
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
