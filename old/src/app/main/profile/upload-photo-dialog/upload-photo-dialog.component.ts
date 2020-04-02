import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ImageService } from '../../../core/services/image.service';
import { AddPhotoDialogComponent } from '../add-photo-dialog/add-photo-dialog.component';
import { ProfileService } from './../profile.service';

@Component({
  selector: 'app-upload-photo-dialog',
  templateUrl: './upload-photo-dialog.component.html',
  styleUrls: ['./upload-photo-dialog.component.scss']
})
export class UploadPhotoDialogComponent implements OnInit {

  public uploadedPhoto: any;
  public gallery = [];
  public fromCam = false;
  _navigator = <any> navigator;
  localStream: any;
  @ViewChild('hardwareVideo', {static: true}) hardwareVideo: any;
  @ViewChild('canvas', {static: true}) canvas: any;

  constructor(
    private dialogRef: MatDialogRef<UploadPhotoDialogComponent>,
    private dialog: MatDialog,
    private imageService: ImageService,
    private profile_service: ProfileService
  ) { }

  ngOnInit() {
    this.profile_service.getProfileMyPhoto().subscribe(res => {
      this.gallery = res.results_list;
    });
  }

  getVideo(){
    this.fromCam = true;
    const video = this.hardwareVideo.nativeElement;
    
    

    this._navigator.getUserMedia = ( this._navigator.getUserMedia || this._navigator.webkitGetUserMedia
    || this._navigator.mozGetUserMedia || this._navigator.msGetUserMedia );

    this._navigator.mediaDevices.getUserMedia({video: { width: 400,  height: 300 }, audio: false})
      .then((stream) => {
        this.localStream = stream;
        video.srcObject=stream;
        video.play();
    });

  }

  stopStream() {
    const tracks = this.localStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  
  }

  takePic(){
    let context = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.hardwareVideo.nativeElement, 0, 0, 400, 300);
    let dataURL = this.canvas.nativeElement.toDataURL();
    this.dialogRef.close();
    this.dialog.open(AddPhotoDialogComponent, { data: dataURL });
    this.stopStream();
    // this.image_data = {imgBase64: dataURL, token: this.session_service.getToken()};
    // this.savePic();
    // this.stopStream();
    // this.photo_service.picTaken();
    // this.dialogRef.close();

  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public onFileChange(event): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      this.imageService.getBase64(file).subscribe(data => {
        this.dialogRef.close();
        this.dialog.open(AddPhotoDialogComponent, { data , width: '1030px' });
      });
    }
  }
}
