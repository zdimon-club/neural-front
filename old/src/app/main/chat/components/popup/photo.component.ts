/* author Zharikov Dimitry zdimon77@gmail.com */
import { ChatService } from '../../services/chat.service';
import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';

// services
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BillingService } from './../../../billing/billing.service';
// store
import { SessionState } from '../../../../auth/store/session.store';
import { Store } from '@ngrx/store';
import {UpdateAccount} from '../../../../auth/store/session.action';

@Component({
    selector     : 'app-chat-video',
    templateUrl  : './photo.component.html',
    styleUrls    : ['./photo.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PhotoPopupComponent implements OnInit {
    photos: any;
    data: any;

    constructor(
        public dialogRef: MatDialogRef<PhotoPopupComponent>,
        private chat_service: ChatService,
        private session_store: Store<SessionState>,
        private billing_service: BillingService,
        @Inject(MAT_DIALOG_DATA) data
    ) {
      this.data = data;
    }

    send(photo: any) {

        const data = {
            service_type: 'photo-in-chat',
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
                    photo
                };
                this.chat_service.sendPhoto(dt).subscribe(() => {
                    this.dialogRef.close();
                });
            }

        });


    }

    ngOnInit(): void {
        this.chat_service.getPhotos().subscribe(data => {
            this.photos = data;
        });
    }



}

