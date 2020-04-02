import { MediaService } from './../../services/media.service';

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {SocketService} from '../../../../socket/socket.service';
import { Observable, Subscription } from 'rxjs';
import {Room, RoomState} from '../../store/chat.store';
import { selectCurrentRoom } from '../../store/chat.selector';
import { select, Store } from '@ngrx/store';


// OpenVidu

import { OpenVidu, Publisher, Session, StreamEvent, StreamManager, Subscriber } from 'openvidu-browser';
import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-chat-abonent-video',
  templateUrl: './abonent.video.component.html',
  styleUrls: ['./abonent.video.component.css']
})
export class AbonentVideoComponent implements OnInit, OnDestroy {

  @Input() abonent: any;
  @Input() timeCounter: any;

  video: any;
  camera_active = false;
  subscribers: any;
  room_subscribers: any;

  current_room: Room;
  is_loading: boolean;

  constructor(
    private socket_service: SocketService,
    private room_store: Store<RoomState>,
    public media_service: MediaService,
    ) {

      this.room_store.select(selectCurrentRoom).subscribe((room: Room) => {
        this.current_room = room;
       });

      this.media_service._subscribers$.subscribe((data) => {
         this.subscribers = data;
       });

      this.media_service._room_subscribers$.subscribe((data) => {
        this.room_subscribers = data;
        console.log(this.room_subscribers);
      });

      this.media_service._isloading_abonent$.subscribe((data: boolean) => {
        this.is_loading = data;
      });

      this.socket_service.hide_cam$.subscribe(() => {

      });

  }

  public showCamera(event: any) {

    const data = {abonent: this.abonent, room: this.current_room};
    this.media_service.cameraShow(data).subscribe(rez => {
      this.media_service.joinToSession(this.abonent.token);
      this.camera_active = true;
    });
  }





  public hideCamera(subscriber: any) {
    this.camera_active = false;
    this.media_service.deleteSubscriber(subscriber);
  }


   ngOnInit() {
    // this.video = this.abonentVideo.nativeElement;

  }

  ngOnDestroy() {
    // this.offer_observer.unsubscribe();
    // this.answer_observer.unsubscribe();
    // this.ice_observer.unsubscribe();
  }




}
