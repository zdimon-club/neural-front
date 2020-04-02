
import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, ViewChild, Inject, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

/// Video Store
import { Store } from '@ngrx/store';
import * as videoActions from './store/video.action';
import { VideoState } from './store/video.store';
import { getVideoList } from './store/video.selector';
///////

/// Session Store
import { SessionState } from '../../auth/store/session.store';
import {selectUser} from '../../auth/store/session.selector';
/////////////

import { User } from './../users/store/users.store';

// services
import { VideoService } from './video.service';
import { fuseAnimations } from '@fuse/animations';
import { SocketService } from './../../socket/socket.service';


// dialog
import { VideoCameraDialogComponent } from './camera.component';

@Component({
    selector     : 'app-photo',
    templateUrl  : './video.component.html',
    styleUrls    : ['./video.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class VideoComponent implements OnInit, OnDestroy
{

    // Private
    private _unsubscribeAll: Subject<any>;
    


    displayedColumns = [ "id", "video", "is_deleted", "is_approved"];

    videos: Observable<any>;
    currentPage: number = 1;
    pageType: string;
    file: any;
    current_user: User;

    constructor(
        private http: HttpClient,
        private router: Router,
        private store: Store<VideoState>,
        private video_service: VideoService,
        private session_store: Store<SessionState>,
        public dialog: MatDialog,
        private socket_service: SocketService,
        private _matSnackBar: MatSnackBar,
    )
    {
      this._unsubscribeAll = new Subject();
      this.videos = this.store.select(getVideoList);
      ;
      // Set current user from store
      this.session_store.select(selectUser)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(user => {
        this.current_user = user;
      });

      this.dialog.afterAllClosed
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.getPage(this.currentPage);
      })

      this.socket_service.video_moderation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.getPage(this.currentPage);
      })

      this.video_service.videosaved$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((rez: any) => {
        let mes ='';
        if(rez.status==1){
          mes = rez.message;
        } else {
          mes = 'Video was created';
        }
        this._matSnackBar.open(mes, 'OK', {
          verticalPosition: 'top',
          duration        : 2000
        });
        this.getPage(1);        
      })
    }


    ngOnInit(): void
    {
        this.getPage(this.currentPage);
    }

    openCamDialog(): void {
      const dialogRef = this.dialog.open(VideoCameraDialogComponent, {
        width: '450px',
        data: {name: 'dima'}
      });
  }

    getPage(page: number){
      this.currentPage = page;
      this.store.dispatch(new videoActions.Get(this.currentPage));        
    }


    onFileChanged(event) {
      this.file = event.target.files[0];
      this.onUpload();
    }
      

    onUpload() {
      //console.log(this.file);
      const formData = new FormData();
      formData.append('video', this.file, this.file.name);
      formData.append('user', this.current_user.id.toString());
      this.video_service.saveVideo(formData);
          
          
    }

    ngOnDestroy(){
        
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

