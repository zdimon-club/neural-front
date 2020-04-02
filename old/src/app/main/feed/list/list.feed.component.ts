
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as feedActions from '../store/feed.action';
import { getFeedList } from './../store/feed.selector';
import { FeedState } from './../store/feed.store';



@Component({
    selector     : 'app-feed-list',
    templateUrl  : './list.feed.component.html',
    styleUrls    : ['./list.feed.component.scss']
})
export class FeedListComponent implements OnInit, OnDestroy {

    // Private
    private _unsubscribeAll: Subject<any>;


    displayedColumns = [ 'id', 'photos', 'videos', 'title'];

    videos: Observable<any>;
    currentPage = 1;
    pageType: string;
    file: any;
    feed: any;
    showSmiles = false;


    constructor(
        private http: HttpClient,
        private router: Router,
        public dialog: MatDialog,
        private feed_store: Store<FeedState>
    ) {
      this._unsubscribeAll = new Subject();
      this.dialog.afterAllClosed.subscribe(data => {
        this.getPage(this.currentPage);
      });

      this.feed = this.feed_store.select(getFeedList);
      this.feed_store.dispatch(new feedActions.LoadMyFeedRequest(this.currentPage));

    }


    ngOnInit(): void {
        this.getPage(this.currentPage);
    }


    getPage(page: number) {
      this.currentPage = page;
      // this.store.dispatch(new videoActions.Get(this.currentPage));
    }

    ngOnDestroy() {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

