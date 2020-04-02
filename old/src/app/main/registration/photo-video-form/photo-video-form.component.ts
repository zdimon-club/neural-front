
import { filter, takeUntil } from 'rxjs/operators';
import { ImageService } from './../../../core/services/image.service';
import { Component, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RegisterWomanComponent } from './../woman/register.woman.component';
import {Router} from '@angular/router';

/// Store
import { Store, select } from '@ngrx/store';
import * as registrationActions from '../../registration/store/registration.action';
import * as sessionActions from './../../../auth/store/session.action';
import { RegistrationState } from './../store/registration.store';
import { registrationStateSelector } from './../store/registration.select';

import { Subject, Observable } from 'rxjs';
import { RegistrationService } from './../registration.service';
import { SessionService } from './../../../auth/session.service';

import { SessionState } from './../../../auth/store/session.store';

@Component({
  selector: 'app-registration-photo-video-form',
  templateUrl: './photo-video-form.component.html',
  styleUrls: ['./photo-video-form.component.scss'],
})
export class RegisterPhotoVideoFormComponent implements OnDestroy {

  activeBlock = 'select';
  public base64Image: any;
  @ViewChild('hardwareVideo', {static: true}) hardwareVideo: any;
  @ViewChild('canvas', {static: true}) canvas: any;
  stream: any;
  @Output() closeEmitter = new EventEmitter();
  regstore: any;

  private unsubscribeAll: Subject<any>;

  constructor(private imageService: ImageService,
    private dialogRef:MatDialogRef<RegisterPhotoVideoFormComponent>,
    public dialog: MatDialog,
    private regStore: Store<RegistrationState>,
    private regService: RegistrationService,
    private session_service: SessionService,
    private session_store: Store<SessionState>,
    private router: Router,
    
    ) {
      this.unsubscribeAll = new Subject();

      this.regStore
      .select(registrationStateSelector)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((value) => {
        this.regstore = value;
      });
  }

  public onFileChange(event, type): void {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.imageService.getBase64(file).subscribe(data => {
          this.base64Image = data;
          this.activeBlock = 'selected';
      });
    }
  }



  initVideo() {
    this.activeBlock = 'camera';
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

  takePic(){
    let context = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.hardwareVideo.nativeElement, 0, 0, 400, 300);
    let dataURL = this.canvas.nativeElement.toDataURL();
    this.stopStream();
    this.base64Image = dataURL;
    this.activeBlock = 'selected';

  }

  savePic(){
    this.regStore.dispatch(new registrationActions.SetPhoto({photo: this.base64Image}))
    const data = {email: this.regstore.email, photo: this.base64Image};
    this.regService.registerMan(data).subscribe((rez: any) => {
      this.session_service.setToken(rez.token);
      this.session_service.setLanguage(rez.language);
      this.session_store.dispatch(new sessionActions.LogIn(rez));
      this.session_store.dispatch(new sessionActions.SetSid({
        token: rez.token,
        socket_id: this.session_service.getSid(),
      }));
      this.router.navigate(['profile/' + rez.user.id]);
    })

    this.dialogRef.close();
    // const dialogRef = this.dialog.open(RegisterWomanComponent, {
    //   height: '400px',
    //   width: '650px',
    // });  
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


}
