import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as feedActions from './store/feed.action';
import { FeedState } from './store/feed.store';
import { getFeedList } from './store/feed.selector';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { FeedVideShowComponent } from './video.show.component';

@Component({
  selector: 'app-user-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {

  feed: any;
  private _unsubscribeAll: Subject<any>;
  page = 1;
  @Input() user_id: number;

  constructor(
    private store: Store<FeedState>,
    public dialog: MatDialog
  ) {
       this._unsubscribeAll = new Subject();
       this.store.select(getFeedList)
       .pipe(takeUntil(this._unsubscribeAll))
       .subscribe((data: any) => {
          this.feed = data;
       })
       ;

   }

   ngOnInit() {
      // console.log(this.user_id);
      this.store.dispatch(new feedActions.GetUserFeedList({page: this.page, user_id: this.user_id}));
    }

    showVideo(video: any) {
      const dialogRef = this.dialog.open(FeedVideShowComponent, {
        width: '450px',
        data: {video}
      });
    }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
