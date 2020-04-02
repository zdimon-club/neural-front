
import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Injector } from '@angular/core';

import {environment} from '../../../../environments/environment';
import { Store } from '@ngrx/store';

/// room state
import {RoomState, IEmojiItem, IStickers, Room} from '../store/chat.store';
import * as roomActions from '../store/chat.action';
import { selectCurrentRoom } from '../store/chat.selector';
import {ReplaySubject, BehaviorSubject, Observable} from 'rxjs';
import { SocketService } from '../../../socket/socket.service';

@Injectable()
export class ChatService {

  popupNewMessage$: ReplaySubject<any>;

  room: any;

  constructor(
    private http: HttpClient,
    public injector: Injector,
    private roomStore: Store<RoomState>,
    private socketService: SocketService
  ) {

    this.roomStore.select(selectCurrentRoom)
    .subscribe(data => {
      this.room = data;
    });

    this.socketService.chat_message$
    .subscribe(data => {
      this.roomStore.dispatch(new roomActions.UpdateRoom(data.data.data));
    });



  }


  public addRoom(data: any) {
    /*
    const data = {
      owner: this.current_user.id,
      abonent: user_id,
    };
    */
    return this.http.post(`${environment.apiUrl}/room/add`, data);
  }

  public selectRoom(id: number) {
    return this.http.get(`${environment.apiUrl}/room/select/${id}`);
  }


  public sendMessage(message: any) {
    return this.http.post(`${environment.apiUrl}/room/message`, message);
  }

  public getRoomList() {
    return this.http.get(`${environment.apiUrl}/room/list`);
  }


  public getSmiles(offset = 0, limit  = 30): Observable<{results: Array<IEmojiItem>, ids}> {
    const params = new HttpParams()
      .set('limit', String(limit))
      .set('offset', String(offset));

    return this.http.get<{results, ids}>(`${environment.apiUrl}/settings/smiles`, {
      params
    });
  }

  public stop(id: number) {
    return this.http.get(`${environment.apiUrl}/room/stop/${id}`);
  }

  public getStickers(): Observable<Array<IStickers>> {
    return this.http.get<Array<IStickers>>(`${environment.apiUrl}/settings/stickers`);
  }

  public sendSticker(sticker: any) {
    return this.http.post(`${environment.apiUrl}/room/send/sticker`, sticker);
  }


  public getVideos() {
    return this.http.get(`${environment.apiUrl}/room/get/video/list`);
  }

  public sendVideo(data: any) {
    return this.http.post(`${environment.apiUrl}/room/send/video`, data);
  }

  public sendPhoto(data: any) {
    return this.http.post(`${environment.apiUrl}/room/send/photo`, data);
  }


  public getPhotos() {
    return this.http.get(`${environment.apiUrl}/room/get/photo/list`);
  }

  public getOnline() {
    return this.http.get(`${environment.apiUrl}/room/online/list`);
  }

  public getFavorites() {
    return this.http.get(`${environment.apiUrl}/room/favorite/list`);
  }

  public payForSticker(data: any) {
    return this.http.post(`${environment.apiUrl}/payment/services/use`, data);
  }

  public getPrivateMedia(data: any) {
    return this.http.post(`${environment.apiUrl}/usermedia/get/private`, data);
  }

  public payPrivateMedia(data: any) {
    return this.http.post(`${environment.apiUrl}/usermedia/pay/private`, data);
  }
}
