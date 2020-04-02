import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
/// OpenVidu
import { OpenVidu, Publisher, Session, StreamEvent, StreamManager, Subscriber } from 'openvidu-browser';
import {
  BehaviorSubject,
  interval,
  Observable,
  of,
  ReplaySubject,
  Subscription,
  throwError as observableThrowError, timer,
} from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { selectUser } from '../../../auth/store/session.selector';
/// Session Store
import { SessionState } from '../../../auth/store/session.store';
/////////////
// User store
import { User } from '../../users/store/users.store';
import { selectCurrentRoom } from '../store/chat.selector';
// Room store
import { RoomState } from '../store/chat.store';
// Services
import { SessionService } from './../../../auth/session.service';
import { StreamState } from '../store/stream.store';
import { ClearCounter, IncreaseCounter } from '../store/stream.action';
import { ActivatedRoute } from '@angular/router';
import { OpenViduError, OpenViduErrorName } from 'openvidu-browser/src/OpenViduInternal/Enums/OpenViduError';


@Injectable()
export class MediaService {

  OV: OpenVidu;
  session: Session;
  publisher: StreamManager; // Local
  subscribers: StreamManager[] = []; // Remotes
  room_subscribers: { [room_id: number]: StreamManager } = {}; // Remotes
  mainStreamManager: StreamManager;
  is_video_streaming = false;
  is_loading = false;
  _publisher$ = new ReplaySubject();
  _isloading$ = new BehaviorSubject(false);
  _isloading_abonent$ = new BehaviorSubject(false);
  _subscribers$ = new BehaviorSubject([]);
  _room_subscribers$ = new BehaviorSubject({});
  current_user: User;
  current_room: any;
  videoTimeCounter: Subscription;
  videoTimers = {};

  constructor(
    private http: HttpClient,
    private session_store: Store<SessionState>,
    private stream_store$: Store<StreamState>, private session_service: SessionService,
    private room_store: Store<RoomState>,
  ) {

    // Set current user from store
    this.session_store.select(selectUser).subscribe(user => {
      this.current_user = user;
    });

    // Set current room from store
    this.room_store.select(selectCurrentRoom).subscribe(room => {
      this.current_room = room;
    });

  }

  emitPublisher(publisher) {
    this._publisher$.next(publisher);
  }


  getCurrentSubscriber() {
    if (this.current_room) {
      return this.room_subscribers[this.current_room.id];
    } else {
      return {};
    }
  }


  getMedia() {
    this._isloading$.next(true);
    this.OV = new OpenVidu();
    this.session = this.OV.initSession();

    this.session.on('streamCreated', (event: StreamEvent) => {
      console.log('[OV session] streamCreated');
      const subscriber: Subscriber = this.session.subscribe(event.stream, undefined);
      this.subscribers.push(subscriber);
      // this.subscriberss[this.current_room.id] = subscriber;
    });

    this.session.on('streamDestroyed', (event: StreamEvent) => {
      console.log('[OV session] streamDestroyed');
      this.deleteSubscriber(event.stream.streamManager);
    });

    this.getToken(this.session_service.getToken()).then(token => {

      // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      this.session.connect(token, { clientData: this.session_service.getToken() })
        .then(() => {

          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          const publisher: Publisher = this.OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: false,     // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true,     // Whether you want to start publishing with your video enabled or not
            resolution: '640x480',  // The resolution of your video
            frameRate: 30,          // The frame rate of your video
            insertMode: 'APPEND',   // How the video is inserted in the target element 'video-container'
            mirror: false,           // Whether to mirror your local video or not
          });

          // --- 6) Publish your stream ---

          this.session.publish(publisher).then(() => {
            this._isloading$.next(false);
          });


          // Set the main video in the page to display our webcam and store our Publisher
          // this.mainStreamManager = publisher;
          /// send data to server
          this.cameraOn().subscribe(data => {
          });
          this.publisher = publisher;
          this.emitPublisher(publisher);
          this._isloading$.next(false);

        })
        .catch(error => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
    });

  }

  joinToSession(sid) {
    this._isloading_abonent$.next(true);
    this.OV = new OpenVidu();
    this.session = this.OV.initSession();
    this.session.on('streamCreated', (event: StreamEvent) => {
      console.log('event session ON', event);
      const subscriber: Subscriber = this.session.subscribe(event.stream, undefined);
      this.subscribers.push(subscriber);
      this.room_subscribers[this.current_room.id] = subscriber;
      this._room_subscribers$.next(this.room_subscribers);
      this.startVideoTime();
    });

    this.session.on('streamDestroyed', (event: StreamEvent) => {
      console.log('event session OFF', event);
      console.log('[OV session] streamDestroyed');
      this.deleteSubscriber(event.stream.streamManager);
    });
    this.getToken(sid).then(token => {

      // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      this.sessionConnect(token, sid);
    });
  }

  private sessionConnect(token: any, sid: any) {
    this.session.connect(token, { clientData: sid })
      .then(() => {
        this._isloading_abonent$.next(false);
        this._subscribers$.next(this.subscribers);
      })
      .catch(error => {
        console.log('There was an error connecting to the session:', error.code, error.message);
        console.log('Reconnect after 5 seconds');
        const t = timer(5000)
          .subscribe(() => {
            console.log('Reconnecting...');
            t.unsubscribe();
            this.sessionConnect(token, sid);
          });
      });
  }

  public deleteSubscriber(streamManager: StreamManager): void {
    const index = this.subscribers.indexOf(streamManager, 0);
    // console.log(this.subscribers);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
    this.clearOneVideoTimer(this.current_room.id);
    // if (this.videoTimeCounter) {
    //   this.videoTimeCounter.unsubscribe();
    //   // this.stream_store$.dispatch(new ClearCounter());
    // }
    delete this.room_subscribers[this.current_room.id];
  }

  private startVideoTime() {
    console.log('start timer');
    if (!this.videoTimers.hasOwnProperty(this.current_room.id)) {
      this.videoTimers[this.current_room.id] = interval(1000)
        .subscribe((count) => {
          this.stream_store$.dispatch(new IncreaseCounter({
            count, room_id: this.current_room.id, userId: this.current_user.id,
          }));
        });
    }
  }

  sendVideoTime(payload): any {
    return this.http.post(`${environment.apiUrl}/webrtc/payment`, payload);
    // const options = {
    //   headers: new HttpHeaders({
    //     Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + environment.OPENVIDU_SERVER_SECRET),
    //     'Content-Type': 'application/json',
    //   }),
    // };
    // const body = { ...payload };

    // console.log('mark', body);

    // /*return this.http.post(environment.OPENVIDU_SERVER_URL + '/api/video-time', body, options).subscribe(res => {
    //   console.log(res);
    // });*/
  }

  getToken(session_id): Promise<string> {

    return this.createSession(session_id).then(
      sessionId => {
        return this.createToken(sessionId);
      });

  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {

      const body = JSON.stringify({ customSessionId: sessionId });
      const options = {
        headers: new HttpHeaders({
          Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + environment.OPENVIDU_SERVER_SECRET),
          'Content-Type': 'application/json',
        }),
      };
      return this.http.post(environment.OPENVIDU_SERVER_URL + '/api/sessions', body, options)
        .pipe(
          catchError(error => {
            if (error.status === 409) {
              resolve(sessionId);
            } else {
              console.warn('No connection to OpenVidu Server. This may be a certificate error at ' + environment.OPENVIDU_SERVER_URL);
              if (window.confirm('No connection toficate error at \"' + environment.OPENVIDU_SERVER_URL +
                '\"\n\nClick OK to navigate and accept it. If no certificate warning is shown, then check that your OpenVidu Server' +
                'is up and running at "' + environment.OPENVIDU_SERVER_URL + '"')) {
                location.assign(environment.OPENVIDU_SERVER_URL + '/accept-certificate');
              }
            }
            return observableThrowError(error);
          }),
        )
        .subscribe((response: any) => {
          resolve(response.id);
        });
    });
  }

  createToken(sessionId): Promise<string> {
    return new Promise((resolve, reject) => {

      const body = JSON.stringify({ session: sessionId });
      const options = {
        headers: new HttpHeaders({
          Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + environment.OPENVIDU_SERVER_SECRET),
          'Content-Type': 'application/json',
        }),
      };
      return this.http.post(environment.OPENVIDU_SERVER_URL + '/api/tokens', body, options)
        .pipe(
          catchError(error => {
            reject(error);
            return observableThrowError(error);
          }),
        )
        .subscribe((response: any) => {
          resolve(response.token);
        });
    });
  }

  public disconect() {
    console.log('disssconection');
    if (this.session) {
      this.session.disconnect();
      this.cameraOff().subscribe(() => {
      });
    }
  }

  public clearAllVideoTimers() {
    for (var property in this.videoTimers) {
      if (this.videoTimers.hasOwnProperty(property)) {
        this.videoTimers[property].unsubscribe();
      }
    }
  }

  private clearOneVideoTimer(room_id) {
    for (var property in this.videoTimers) {
      if (this.videoTimers.hasOwnProperty(room_id)) {
        this.videoTimers[room_id].unsubscribe();
        delete this.videoTimers[room_id];
      }
    }
  }

  public cameraOn() {
    return this.http.get(`${environment.apiUrl}/webrtc/cameraOn`);
  }

  public cameraOff() {
    return this.http.get(`${environment.apiUrl}/webrtc/cameraOff`);
  }

  public cameraShow(data: any) {
    return this.http.post(`${environment.apiUrl}/webrtc/cameraShow`, data);
  }

  public cameraHide(data: any) {
    return this.http.post(`${environment.apiUrl}/webrtc/cameraHide`, data);
  }

}
