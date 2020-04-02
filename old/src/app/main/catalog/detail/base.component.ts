import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../catalog.service';
// import { ChatService } from '../../chat/services/chat.service';
import { selectUser } from '../../../auth/store/session.selector';
import { Observable, Subscription } from 'rxjs';
import { SessionState } from '../../../auth/store/session.store';

import { DetailPopupFeedComponent } from './../../feed/detail/detail.popup.feed.component';
// dialog
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalog-detail',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit, OnDestroy {

  user: any;
  private sub: any;
  private current_user: any;
  public slider_media: any[];
  private feed_id: string;

  constructor(
    private route: ActivatedRoute,
    private catalog_service: CatalogService,
    // private chat_service: ChatService,
    private router: Router,
    private session_store: Store<SessionState>,
    public dialog: MatDialog
  ) {


  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {

          this.feed_id = this.route.snapshot.params.feedId;
          if (this.feed_id) {

            this.dialog.open(DetailPopupFeedComponent, {
              width: '600px',
              data: {feed_id: this.feed_id}
            });

          }


          this.catalog_service.get_detail(params.id).subscribe((data: any) => {
          this.user = data;
          this.slider_media = [];
          data.gallery.forEach(el => {
            if (el.type_media === 'photo') {
              this.slider_media.push( {
                image: el.image_big,
                thumbImage: el.get_middle_url_square,
              });
            } else {
              this.slider_media.push( {
                video: el.video_url,
                posterImage: el.get_middle_url_square,
              });
            }

            });
          });


    });

    // Set current user from store

    this.session_store.select(selectUser).subscribe(user => {
      this.current_user = user;
    });

  }

  public callToChat(userId: number) {
    const data = {
      owner: this.current_user.id,
      abonent: userId
    };

    /*
    this.chat_service.addRoom(data).subscribe(data => {
      //console.log(data);

      this.router.navigate(['/main/chat/room', data['id']]);
    });
    */
  }



  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
