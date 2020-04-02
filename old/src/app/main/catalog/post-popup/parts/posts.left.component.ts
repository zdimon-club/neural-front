
import {
  Component,
  Input,
  Output,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  EventEmitter,
} from '@angular/core';

import { CatalogService } from './../../catalog.service';

@Component({
  selector: 'app-feed-posts-left',
  templateUrl: './posts.left.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PostsLeftComponent implements OnInit, OnDestroy {
  @Input() feed: any;
  @Input() isAuth: boolean;
  @Output() postCommentEmmiter: EventEmitter<any> = new EventEmitter();
  @Output() subscribeEmmiter: EventEmitter<any> = new EventEmitter();
  @Output() callToChatEmmiter: EventEmitter<any> = new EventEmitter();

  comment = '';

  constructor(private catalog_service: CatalogService) {}

  handleClickLike(feed): void {
    if (feed.is_liked) {
      this.feed.likes--;
    } else {
      const data = {
        obj_model: 'userfeed',
        obj_id: feed.id
      };
      this.catalog_service.addLike(data).subscribe((rez) => {
        console.log(rez);
      });
      this.feed.likes++;
    }
    feed.is_liked = !feed.is_liked;
  }

  postComment(feed) {
    const data = { id: feed.id, comment: this.comment };
    this.postCommentEmmiter.emit(data);
    this.comment = '';
  }

  emitSubscribe(feed) {
    const data = { value: true, feed };
    feed.is_subscribed = true;
    this.subscribeEmmiter.emit(data);
  }

  emitUnSubscribe(feed) {
    const data = { value: false, feed };
    this.subscribeEmmiter.emit(data);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
