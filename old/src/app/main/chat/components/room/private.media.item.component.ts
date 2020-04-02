/* author zdimon77@gmail.com */

import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Message } from '../../store/chat.store';
import { ChatService } from './../../services/chat.service';
import { BillingService } from './../../../billing/billing.service';

import { SessionState } from '../../../../auth/store/session.store';
import { Store } from '@ngrx/store';
import {UpdateAccount} from '../../../../auth/store/session.action';


@Component({
  selector: 'app-chat-private-media-item',
  template: `
    <a (click)="payMedia()" class="btn btn-primary" *ngIf="!is_paid"> Show the content </a>
    <ng-container *ngIf="is_paid">
      <img *ngIf="media.type_media == 'photo'" [src]="media.image_big" />
      <video *ngIf="media.type_media == 'video'" [src]="media.get_video_url" controls></video>
    </ng-container>
  `,
  styles: ['a.btn-primary {color: black}']
})
export class ChatPrivateMediaItemComponent implements OnInit {

  @Input() message: Message;
  @Input() current_user = false;
  is_paid = false;
  media: any;

  constructor(
    private chat_service: ChatService,
    private billing_service: BillingService,
    private session_store: Store<SessionState>,
    ) {
    
  }

   ngOnInit() {
    let data = {
      message_id: this.message.id
    }
    this.chat_service.getPrivateMedia(data).subscribe((rez: any) => {
      if(rez.status === 0) {
        this.is_paid = true;
        this.media = rez.media;
      } else {
        this.is_paid = false;
      }
    })
  }

  payMedia(){
    let data = {
      message_id: this.message.id
    }
    this.chat_service.payPrivateMedia(data).subscribe((rez: any) => {
      if(rez.status === 0) {
        this.session_store.dispatch(new UpdateAccount(rez.account));
        this.is_paid = true;
        this.media = rez.media;
      } 

      if(rez.status === 2) {
        this.billing_service.showDialog();
      } 

    })
  }


}
