import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-feed-profile',
  templateUrl: './feed-profile.component.html',
  styleUrls: ['./feed-profile.component.scss']
})
export class FeedProfileComponent implements OnInit {

  @Input() user;

  constructor() { }

  posts = [];
  public createPostField = '';
  public createCommentField = '';

  ngOnInit() {
    this.posts = [
      {
        username: 'Benjamin',
        date: 645645645645,
        age: 26,
        body: this.user.middle_photo,
        likes: 24,
        comments: [
          {
            username: 'Diana',
            date: 54654645,
            age: 25,
            commentText: 'Nice Photo',
            main_photo: this.user.middle_photo
          },
          {
            username: 'Diana',
            date: 5645645,
            age: 25,
            commentText: 'Nice Photo lorem als',
            main_photo: this.user.middle_photo,
            reply_comments: [
              {
                username: 'Bryan',
                date: 5445645646,
                age: 25,
                commentText: 'Lorem ipsum dolor ',
                main_photo: this.user.middle_photo,
              }
            ]
          }
        ]
      },
      {
        username: 'Benjamin',
        date: 645654645,
        age: 26,
        body: this.user.middle_photo,
        likes: 24,
        comments: [
          {
            username: 'Diana',
            date: 54645645645,
            age: 25,
            commentText: 'Nice Photo',
            main_photo: this.user.middle_photo
          },
          {
            username: 'Diana',
            date: 1574169701900,
            age: 25,
            commentText: 'Nice Photo lorem ka sdad',
            main_photo: this.user.middle_photo
          }
        ]
      }, {
        username: 'Benjamin',
        date: 1574169701900,
        age: 26,
        body: this.user.middle_photo,
        likes: 24,
        comments: [
          {
            username: 'Diana',
            date: 1574169701900,
            age: 25,
            commentText: 'Nice Photo',
            main_photo: this.user.middle_photo
          },
          {
            username: 'Diana',
            date: 1574169701900,
            age: 25,
            commentText: 'Nice Photo lorem sdlamsd asdlka sdad',
            main_photo: this.user.middle_photo
          }
        ]
      }];


    this.posts.forEach(post => {
      post.commentsOpened = false;
    });
  }

  public openPostComments(index): void {
    this.posts[index].commentsOpened = !this.posts[index].commentsOpened;
  }

  public deletePost(i): void {

  }

  public likePost(i): void {

  }
}
