

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
export class AbonentVideoService {

  _log_emmiter$ = new ReplaySubject();
  _navigator = navigator as any;
  localStream;
  private peerConnection: RTCPeerConnection;
  private current_room: Room;
  offer_observer: Subscription;
  ice_observer: Subscription;
  private video: any;

  constructor(
    private http: HttpClient,
    // private webrtc: WebRtcService,
    private socket_service: SocketService,
  ) {



  }

  public init(video: any, current_room) {
    this.current_room = current_room;
    this.video = video;
    this.setupPeerConnection();
    // observe offer and ice from remote host
    this.offer_observer = this.socket_service.offer_emmiter$.subscribe((data: any) => {
      this.log('[abonent] offer gotten');

      this.peerConnection.setRemoteDescription(data.data.offer)
      .then( () => {
          this.peerConnection.createAnswer()
          .then(this.setDescription())
          .catch(this.errorHandler);
        }
      )
      .catch(this.errorHandler);

    });

    this.ice_observer = this.socket_service.ice_emmiter$.subscribe((data: any) => {
      if (data.data.dest === 'abonent') {
        this.log('[abonent] ice gotten');
        // console.log(this.peerConnection);
        console.log(data);
        if (this.peerConnection) {
          this.log('puting ice');
          this.peerConnection.addIceCandidate(new RTCIceCandidate(data.data.ice)).catch(this.errorHandler);
        }
      }
    });
    /////

  }

  private setDescription(): (res: any) => void {
    return (description) => {
      this.log(' [abonent] got description');
      // console.log(description);
      // console.log(this.peerConnection);
      // this.socket_service.sendOffer({'offer': description})

      this.peerConnection.setLocalDescription(description)
        .then(() => {
          // this.signalingConnection.send(JSON.stringify({ 'sdp': this.peerConnection.localDescription, 'uuid': this.uuid }));
        })
        .catch(this.errorHandler);

        /*
      this.webrtc.sendAnswer({
        offer: description,
        room_id: this.current_room.id
      }).subscribe((data: any) => {
          this.log(' [abonent] sending answer');
      });
      */



    };
   }

  private gotRemoteStream = (event: any) => {
    this.log('[abonent] got remote stream');
    alert('remote stream!');
    console.log(event.streams);
    this.video.srcObject = event.streams[0];

  }

  private setupPeerConnection() {
    this.peerConnection = new RTCPeerConnection(PEER_CONNECTION_CONFIG);
    this.peerConnection.onicecandidate = this.getIceCandidateCallback();
    this.peerConnection.ontrack = this.gotRemoteStream;
  }

  private getIceCandidateCallback(): (res: any) => void {
    return (event) => {
      this.log(`[abonent] got ice candidate:`);
      if (event.candidate != null) {
        const data = {
          room_id: this.current_room.id,
          ice: event.candidate,
          dest: 'owner'
        };
        /*
        this.webrtc.sendIce(data).subscribe((data: any) => {
          this.log('[abonent] sending ice candidate');
        });
        */

      }
    };
  }


  public log(msg: string) {
      this._log_emmiter$.next(msg);
      console.log(msg);
  }




  private errorHandler(error) {
    console.log(error);
  }

}
