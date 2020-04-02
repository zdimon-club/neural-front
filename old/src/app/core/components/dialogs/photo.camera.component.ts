import { OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FeedService } from '../../../main/feed/feed.service';


@Component({
  selector: 'app-camera-dialog',
  templateUrl: './photo.camera.component.html',
})
export class PhotoCameraDialogComponent implements OnInit, OnDestroy {
  @ViewChild('hardwareVideo', { static: true }) hardwareVideo: any;
  @ViewChild('canvas', { static: true }) canvas: any;
  stream;
  image_data: { imgBase64: string };

  constructor(
    public dialogRef: MatDialogRef<PhotoCameraDialogComponent>,
  ) {
  }

  ngOnInit(): void {
    this.initVideo();
  }

  initVideo() {
    const video = this.hardwareVideo.nativeElement;
    navigator.mediaDevices.getUserMedia({ video: { width: 400, height: 300 }, audio: true })
      .then((stream) => {
        this.stream = stream;
        video.srcObject = stream;
        video.play();
        this.hardwareVideo.nativeElement.volume = 0.0;
      });
  }

  stopStream() {
    const tracks = this.stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });

  }

  takePic() {
    const context = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.hardwareVideo.nativeElement, 0, 0, 400, 300);
    const dataURL = this.canvas.nativeElement.toDataURL();
    this.image_data = { imgBase64: dataURL };
    this.dialogRef.close(dataURL);
    this.stopStream();
  }

  ngOnDestroy(): void {
    this.stopStream();
  }
}

