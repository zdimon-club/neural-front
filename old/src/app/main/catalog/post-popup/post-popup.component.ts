import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FeedService } from '../../feed/feed.service';
import { UserState } from '../../users/store/users.store';
import * as feedActions from './../../feed/store/feed.action';
import { selectFeedById } from './../../feed/store/feed.selector';
import { Feed, FeedState } from './../../feed/store/feed.store';

@Component({
  selector: 'app-post-popup',
  templateUrl: './post-popup.component.html',
  styleUrls: ['./post-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostPopupComponent implements OnInit, OnDestroy {
  @Input() current_user: any = null;
  @Input() isAuth = false;
  @Input() is_displayed = false;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Output() subscribe: EventEmitter<any> = new EventEmitter();
  @Output() unSubscribe: EventEmitter<any> = new EventEmitter();
  @Output() displayPopup: EventEmitter<any> = new EventEmitter();
  @Output() callToChat: EventEmitter<any> = new EventEmitter();

  private sub: any;
  public current_post: any;
  public is_opened = false;
  public is_freezed = false;
  public is_anim_started = false;
  public is_loading = true;
  public is_first_video_downloaded = false;
  public feed: Observable<Feed>;
  public initialPopupHeight = 'calc(100vh - 100px)';
  public popupHeight: string = this.initialPopupHeight;
  public commentMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private user_store: Store<UserState>,
    private _feed_service: FeedService,
    private feed_store: Store<FeedState>,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // show popup
        if (this.route.snapshot.url.length > 1) {
          this.feed_store.dispatch(
            new feedActions.GetFeedRequest(parseInt(this.route.snapshot.url[1].path)),
          );
          this.feed = this.feed_store.select(
            selectFeedById(parseInt(this.route.snapshot.url[1].path)),
          );
          console.log(
            this.feed_store.select(selectFeedById(parseInt(this.route.snapshot.url[1].path))),
          );
          this.is_loading = false;
          this.is_displayed = true;
          this.is_opened = true;
          this.displayPopup.emit(true);
          // setTimeout(() => (this.is_freezed = false), 200);
        } else {
          // close popup
          this.is_opened = false;
          this.is_loading = true;
          this.displayPopup.emit(false);
        }
      }
    });
  }

  postComment(data) {
    this.feed_store.dispatch(new feedActions.AddCommentRequest(data));
  }

  handleFirstVideoDownloaded() {
    this.is_first_video_downloaded = true;
  }

  handleSubscribe(data) {
    this.feed_store.dispatch(new feedActions.SubscribeRequest(data));
  }

  emitClickOutside() {
    this.closeModal.emit();
  }

  emitSubscribe(user): void {
    this.subscribe.emit(user);
  }
  emitUnSubscribe(user): void {
    this.unSubscribe.emit(user);
  }

  emitCallToChat(user_id: number) {
    this.callToChat.emit(user_id);
  }

  // fetchPopupData(url) {
  //   this.user_store.pipe(select(getUserById(url[1].path))).subscribe((value) => {
  //     this.current_post = value;
  //     this.is_freezed = true;
  //     setTimeout(() => (this.is_freezed = false), 200);
  //     this.is_opened = true;

  //     this._feed_service
  //       .getFeedDetailById(this.current_post.id || (url[0].path === 'post' ? url[1].path : false))
  //       .pipe(
  //         map((dataComment) => {
  //           const newUserIds = dataComment.feedcomment.reduce((accum, comment) => {
  //             if (comment.user) {
  //               accum.push(comment.user);
  //             }
  //             return accum;
  //           }, []);
  //           // this.user_store.dispatch(new UpdateUsers(newUserIds));
  //           return dataComment;
  //         }),
  //       )

  //       .subscribe((res: any) => {
  //         this.feed_info = res;
  //         // console.log(res);
  //         this.feed_store.dispatch(new feedActions.GetFeedDone(res));
  //         setTimeout(() => (this.is_loading = false), 100);
  //       });
  //   });
  // }

  ngOnInit() {
    // this.sub = this.route.url.subscribe((url) => {
    //   if (url[0] && url[0].path === 'post') {
    //     this.is_loading = true;
    //     this.displayPopup.emit(true);
    //     this.fetchPopupData(url);
    //   } else {
    //     this.is_opened = false;
    //     this.is_loading = true;
    //     setTimeout(() => this.displayPopup.emit(false), 150);
    //   }
    // });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
