

import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-user-feed-video-show',
  template: `
  <h1 mat-dialog-title>{{data.video.title}}</h1>
  <!--<button mat-dialog-close><mat-icon>close</mat-icon></button>-->
  <div mat-dialog-content>

  <div *ngFor="let item of data.video.feedmedia ">
      <video *ngIf="item.type_media=='video'" [src]="item.get_video_url" controls></video>
  </div>
  </div>

  `,
})
export class FeedVideShowComponent implements OnInit, OnDestroy {

  feed: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    public dialogRef: MatDialogRef<FeedVideShowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this._unsubscribeAll = new Subject();
   }

   ngOnInit() {

    }



  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
