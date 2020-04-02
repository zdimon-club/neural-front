import { OnDestroy } from '@angular/core';
// services
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as RecordRTC from 'recordrtc';
import { FeedService } from './../../feed.service';


@Component({
    selector     : 'app-feed-camera-dialog',
    templateUrl  : './video.camera.component.html'
})
export class VideoCameraDialogComponent implements OnInit, OnDestroy {

    @ViewChild('hardwareVideo', {static: true}) hardwareVideo: any;
    @ViewChild('canvas', {static: true}) canvas: any;
    _navigator = navigator as any;
    localStream;
    image_data: any;
    recordRTC: any;
    is_cam_active = false;
    is_rec_active = false;

    constructor(
        private http: HttpClient,
        public dialogRef: MatDialogRef<VideoCameraDialogComponent>,
        private router: Router,
        private feed_service: FeedService
    ) {

    }


    ngOnInit(): void {
      this.getVideo();
    }

    getVideo() {

        const video = this.hardwareVideo.nativeElement;
        this._navigator =  navigator as any;

        this._navigator.getUserMedia = ( this._navigator.getUserMedia || this._navigator.webkitGetUserMedia
        || this._navigator.mozGetUserMedia || this._navigator.msGetUserMedia );

        this._navigator.mediaDevices.getUserMedia({video: { width: 400,  height: 300 }, audio: false})
          .then((stream) => {

            const options = {
              mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
              audioBitsPerSecond: 128000,
              videoBitsPerSecond: 128000,
              bitsPerSecond: 128000 // if this line is provided, skip above two
            };

            this.localStream = stream;
            this.recordRTC = RecordRTC(stream, options);
            video.srcObject = stream;
            video.play();
            this.hardwareVideo.nativeElement.volume = 0.0;
            this.is_cam_active = true;
        });

      }

      startRec() {
        this.recordRTC.startRecording();
        this.is_rec_active = true;
      }

      stopRec() {
        const recordRTC = this.recordRTC;
        recordRTC.stopRecording(this.processVideo.bind(this));
        this.is_rec_active = false;
        this.dialogRef.close();
        this.stopStream();
      }

      processVideo() {

        const formData = new FormData();
        formData.append('video', this.recordRTC.blob, 'video.mp3');
        formData.append('user', '1');
        console.log('cammmera');
        this.feed_service.videoRecorded(this.recordRTC.blob);
        // this.video_service.saveVideo(formData)
        // .subscribe((rez: any) => {
        //
        // });
    }

      stopStream() {
        const tracks = this.localStream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });

      }

    takePic() {
        const context = this.canvas.nativeElement.getContext('2d');
        context.drawImage(this.hardwareVideo.nativeElement, 0, 0, 400, 300);
        const dataURL = this.canvas.nativeElement.toDataURL();
        this.image_data = {imgBase64: dataURL};
        this.savePic();
        this.stopStream();
        // this.photo_service.picTaken();
        this.dialogRef.close();

      }
      savePic() {


      }

      ngOnDestroy(): void {
        this.stopStream();
      }

}

