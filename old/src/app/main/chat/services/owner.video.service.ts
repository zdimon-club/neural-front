

import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Injector } from '@angular/core';
import {ReplaySubject} from 'rxjs';
import { environment } from '../../../../environments/environment';
// import {WebRtcService} from './webrts.service';
import {Room, RoomState} from '../store/chat.store';
import {Subscription} from 'rxjs';
import {SocketService} from '../../../socket/socket.service';

const mediaConstraints: RTCOfferOptions = {

  offerToReceiveAudio: true,
  offerToReceiveVideo: true,

};


const ICE_SERVERS: RTCIceServer[] = [
  {urls: 'stun:stun.l.google.com:19302'}
];

const PEER_CONNECTION_CONFIG: RTCConfiguration = {
  iceServers: ICE_SERVERS
};

@Injectable()
export class OwnerVideoService {

  _log_emmiter$ = new ReplaySubject();
  _navigator = navigator as any;
  localStream;
  private OwnerPeerConnection: RTCPeerConnection;
  private current_room: Room;
  answer_observer: Subscription;
  ice_observer: Subscription;

  constructor(
    private http: HttpClient,
    // private webrtc: WebRtcService,
    private socket_service: SocketService,
  ) {

    this.OwnerPeerConnection = new RTCPeerConnection(PEER_CONNECTION_CONFIG);
    // this.OwnerPeerConnection.onicecandidate = this.getIceCandidateCallback();

    this.answer_observer = this.socket_service.answer_emmiter$.subscribe((data: any) => {
      this.log('[owner] answer gotten from remote server');
      this.OwnerPeerConnection.setRemoteDescription(new RTCSessionDescription(data.data.offer));
      // console.log(this.peerConnection);
      // this.makeConnection();
    });

    this.ice_observer = this.socket_service.ice_emmiter$.subscribe((data: any) => {
      this.log('[owner] ice gotten by socket');

      if (data.data.dest === 'owner') {
      // console.log(this.peerConnection);
      // console.log(data.data);
      if (this.OwnerPeerConnection) {
        this.log('puting ice to connection');
        this.OwnerPeerConnection.addIceCandidate(new RTCIceCandidate(data.data.ice)).catch(this.errorHandler);
        }
      }
    });

  }

  public log(msg: string) {
      this._log_emmiter$.next(msg);
  }

  getMedia(video: any, current_room: Room) {
    // const video = this.hardwareVideo.nativeElement;
    this._navigator =  navigator as any;
    this.current_room = current_room;

    this._navigator.getUserMedia = ( this._navigator.getUserMedia || this._navigator.webkitGetUserMedia
    || this._navigator.mozGetUserMedia || this._navigator.msGetUserMedia );

    this._navigator.mediaDevices.getUserMedia({video: { width: 400,  height: 300 }, audio: false})
      .then((stream) => {
        this.localStream = stream;
        video.srcObject = stream;
        video.play();
        this.log('[owner] Get user media');
        this.makeConnection();

    });
    // this.is_video = true;
    // this.makeConnection();
  }


  makeConnection() {
    /// this.webrtc.init();
    this.log('making connection');

    if (this.localStream) {
      this.localStream.getTracks().forEach((track: any) => {

          this.log('[owner] adding track');
          this.OwnerPeerConnection.addTrack(track, this.localStream);

          /*
          this.OwnerPeerConnection
          .createOffer(mediaConstraints)
          .then(this.setDescription())
          .catch(this.errorHandler);
          */

    });
  }

  }

  /*
  private setDescription(): (res: any) => void {
    return (description) => {
      this.log('[owner] setting local description');

      this.OwnerPeerConnection.setLocalDescription(description)
        .then(() => {
          this.webrtc.sendOffer({
            offer: description,
            room_id: this.current_room.id
          }).subscribe((data: any) => {
              console.log(data);
          });
        })
        .catch(this.errorHandler);
    };

  };

  public setupPeerConnection(clb: any) {


    clb(this.OwnerPeerConnection);

    // this.peerConnection.ondatachannel = (event) => { console.log(`received message from channel`); };
    // this.sendChannel = this.peerConnection.createDataChannel('sendDataChannel');
  }

  private getIceCandidateCallback(): (string) => void {
    return (event) => {
      this.log(`[owner] got ice candidate`);
      // console.log(event);

      if (event.candidate != null) {
        const data = {

          room_id: this.current_room.id,
          ice: event.candidate,
          dest: 'abonent'
        };
        this.webrtc.sendIce(data).subscribe((data: any) => {
          console.log(data);
        });

      }
    };
  }

  */

  removeMedia() {
    const tracks = this.localStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });

  }


  private errorHandler(error) {
    console.log(error);
  }

}
