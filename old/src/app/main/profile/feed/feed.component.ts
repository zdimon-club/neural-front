import { Component, Input, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedService } from '../../feed/feed.service';
import { MatDialog } from '@angular/material';
import { ChatService } from './../../chat/services/chat.service';
import { FeedPopupComponent } from './popup/feed.popup.component';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  @Input() posts;
  @Output() changePage = new EventEmitter();
  @Output() onDeletePost = new EventEmitter();
  @Output() onAddComment = new EventEmitter();
  @Output() onAddLike = new EventEmitter();
  showSmiles = false;

  smiles: any;


  constructor(
      private _snackBar: MatSnackBar,
      private feedService: FeedService,
      private chat_service: ChatService,
      private dialog: MatDialog
  ) { }


  public commentText = '';



  ngOnInit() {

    this.chat_service.getSmiles().subscribe(data => {
      this.smiles = data;
    });

  }

  showMedia(media: any): void {
    const dialogRef = this.dialog.open(FeedPopupComponent, {
      width: '90%',
      height: '100%',
      data: {media: media}
    });
  }

  addSmile(smile: any) {
    this.commentText = this.commentText + ' ' + smile.alias + ' ';
  }

  public deletePost(post: any): void {
    if (confirm('Are you sure to delete?')) {
      this.onDeletePost.emit(post);
    }
  }

  public likePost(post: any): void {
    this.onAddLike.emit(post);

  }

  public openPostComments(index): void {
    this.posts[index].commentsOpened = !this.posts[index].commentsOpened;
  }

  public addComment(id, comment): void {

    if (id > 0 && comment) {
      const data = {
        id,
        comment,
      };
      this.onAddComment.emit(data);
      this.commentText = '';
    }
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
