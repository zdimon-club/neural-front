import { OnDestroy } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as RecordRTC from 'recordrtc';


@Component({
  selector: 'app-feed-camera-dialog',
  templateUrl: './video.camera.component.html',
})
export class VideoCameraDialogComponent implements OnInit, OnDestroy {
  @ViewChild('hardwareVideo', { static: true }) hardwareVideo: any;
  stream;
  recorder: any;
  is_cam_active = false;
  is_rec_active = false;

  constructor(
    public dialogRef: MatDialogRef<VideoCameraDialogComponent>,
  ) {
  }

  ngOnInit(): void {
    this.initVideo();
  }

  async initVideo() {
    const video = this.hardwareVideo.nativeElement;

    this.stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 400, height: 300 }, audio: true,
    });

    const options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000, // if this line is provided, skip above two
    };

    this.recorder = new RecordRTC.RecordRTCPromisesHandler(this.stream, options);
    video.srcObject = this.stream;
    video.play();
    this.hardwareVideo.nativeElement.volume = 0.0;
    this.is_cam_active = true;

  }

  startRec() {
    this.recorder.startRecording();
    this.is_rec_active = true;
  }

  async stopRec() {
    await this.recorder.stopRecording();
    const blob = await this.recorder.getBlob();
    this.dialogRef.close(blob);
    this.is_rec_active = false;
    this.stopStream();
  }

  stopStream() {
    const tracks = this.stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  }

  ngOnDestroy() {
    this.stopStream();
  }
}

