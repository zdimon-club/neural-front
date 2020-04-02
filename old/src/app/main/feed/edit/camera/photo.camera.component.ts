import { OnDestroy } from '@angular/core';
// services
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FeedService } from './../../feed.service';



@Component({
    selector     : 'app-feed-camera-dialog',
    templateUrl  : './photo.camera.component.html'
})
export class PhotoCameraDialogComponent implements OnInit, OnDestroy {

    @ViewChild('hardwareVideo', {static: true}) hardwareVideo: any;
    @ViewChild('canvas', {static: true}) canvas: any;
    _navigator = navigator as any;
    localStream;
    image_data: any;


    constructor(
        private http: HttpClient,
        public dialogRef: MatDialogRef<PhotoCameraDialogComponent>,
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
            this.localStream = stream;
            video.srcObject = stream;
            video.play();
        });

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
        this.feed_service.photoRecorded(this.image_data);
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

