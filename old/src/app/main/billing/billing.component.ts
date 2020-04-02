import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
// services
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import { SessionState } from '../../auth/store/session.store';
import { Store } from '@ngrx/store';
import {AddAccount} from '../../auth/store/session.action';

@Component({
    selector     : 'app-camera-dialog',
    templateUrl  : './billing.popup.component.html',
})
export class BillingPopupComponent implements OnInit {
    billing: any;


    constructor(
        public dialogRef: MatDialogRef<BillingPopupComponent>,
        private session_store: Store<SessionState>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {

    }

    replanish(plan: any) {
        const data = {credits: plan.credit, plan_id: plan.id};
        this.session_store.dispatch(new AddAccount(data));
        this.dialogRef.close();
    }

    ngOnInit(): void {

    }



}

