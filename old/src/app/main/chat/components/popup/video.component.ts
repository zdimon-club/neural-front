/* author Zharikov Dimitry zdimon77@gmail.com */
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatService } from '../../services/chat.service';

import { BillingService } from './../../../billing/billing.service';

// store
import { SessionState } from '../../../../auth/store/session.store';
import { Store } from '@ngrx/store';
import {UpdateAccount} from '../../../../auth/store/session.action';

@Component({
    selector     : 'app-chat-video',
    templateUrl  : './video.component.html',
    styleUrls    : ['./video.component.scss'],

    encapsulation: ViewEncapsulation.None,
})
export class VideoPopupComponent implements OnInit {
    video: any;
    data: any;

    constructor(
        public dialogRef: MatDialogRef<VideoPopupComponent>,
        private chat_service: ChatService,
        private session_store: Store<SessionState>,
        private billing_service: BillingService,
        @Inject(MAT_DIALOG_DATA) data
    ) {
      this.data = data;
    }

    send(video: any) {

        const data = {
            service_type: 'video-in-chat',
            limit: 1,
            room_id: this.data.room.id

          };
        this.chat_service.payForSticker(data).subscribe((res: any) => {
            // console.log(res);
            if (res.status === 2) {
                this.billing_service.showDialog();
            }

            if (res.status === 0) {
                this.session_store.dispatch(new UpdateAccount(res.account));
                const dt = {
                    room: this.data.room,
                    user: this.data.user,
                    payment_id: res.payment_id,
                    video
                };
                this.chat_service.sendVideo(dt).subscribe(() => {
                    this.dialogRef.close();
                });
            }

        });

    }

    ngOnInit(): void {
        this.chat_service.getVideos().subscribe(data => {
            this.video = data;
        });
    }



}

