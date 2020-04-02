import { Observable } from 'rxjs';
import { VideoService } from './video.service';
import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, Inject, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

// services
import { HttpClient } from '@angular/common/http';
import { SessionService } from './../../auth/session.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


/// Store
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { User } from './../users/store/users.store';
///////

/// Session Store
import { SessionState } from '../../auth/store/session.store';
import {selectUser} from '../../auth/store/session.selector';
/////////////

import { Subject } from 'rxjs';
import * as RecordRTC from 'recordrtc';



@Component({
    selector     : 'app-camera-dialog',
    templateUrl  : './camera.component.html',

    encapsulation: ViewEncapsulation.None,
})
export class VideoCameraDialogComponent implements OnInit
{

    @ViewChild('hardwareVideo', {static: true}) hardwareVideo: any;
    @ViewChild('canvas', {static: true}) canvas: any;
    _navigator = <any> navigator;
    localStream;
    image_data: any;
    is_cam_active: boolean = false;
    is_rec_active: boolean = false;
    current_user: User;

    private _unsubscribeAll: Subject<any>;
    recordRTC: any;

    constructor(
        private session_service: SessionService,
        private http: HttpClient,
        public dialogRef: MatDialogRef<VideoCameraDialogComponent>,
        private router: Router,
        private video_service: VideoService,
        private session_store: Store<SessionState>,
    )
    {
      this._unsubscribeAll = new Subject();
      
      this.session_store.select(selectUser)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(user => {
        this.current_user = user;
      });
    }


    ngOnInit(): void
    {
        this.getMedia();
    }

    getMedia(){

        const video = this.hardwareVideo.nativeElement;
        this._navigator = <any>navigator;

        this._navigator.getUserMedia = ( this._navigator.getUserMedia || this._navigator.webkitGetUserMedia
        || this._navigator.mozGetUserMedia || this._navigator.msGetUserMedia );

        this._navigator.mediaDevices.getUserMedia({video: { width: 400,  height: 300 }, audio: true})
          .then((stream) => {

            var options = {
              mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
              audioBitsPerSecond: 128000,
              videoBitsPerSecond: 128000,
              bitsPerSecond: 128000 // if this line is provided, skip above two
            }

            this.localStream = stream;
            this.recordRTC = RecordRTC(stream, options);

            video.srcObject=stream;
            video.play();

            this.hardwareVideo.nativeElement.volume = 0.0;

            this.is_cam_active = true;
        });

      }

      stopMedia() {
        const tracks = this.localStream.getTracks();
        tracks.forEach((track) => {
          track.stop();
          this.is_cam_active = false;
        });

      }

      startRec(){
        this.recordRTC.startRecording();
        this.is_rec_active = true;
      }

      stopRec(){
        let recordRTC = this.recordRTC;
        recordRTC.stopRecording(this.processVideo.bind(this));
        this.is_rec_active = false;
        this.dialogRef.close();
        const tracks = this.localStream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }

      processVideo(){

          const formData = new FormData();
          formData.append('video', this.recordRTC.blob, 'video.mp3');
          formData.append('user', this.current_user.id.toString());
          console.log('cammmera');
          this.video_service.saveVideo(formData);
      }


      ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.stopMedia();
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
      }
}

