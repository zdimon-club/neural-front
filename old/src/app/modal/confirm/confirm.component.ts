import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ModalState } from '../store/modal.store';
import { CloseModal } from '../store/modal.action';

export interface IConfirmationModalBody {
  title: string;
  type: 'default' | 'warning';
  content: string;
  buttons: IConfirmationButton[];
}

interface IConfirmationButton {
  title: string;
  type: 'default' | 'outline';
  action: 'accept' | 'reject' | 'navigate';
  link?: string;
}

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent implements OnInit {

  constructor(@Optional() @Inject(MAT_DIALOG_DATA)
              public data: IConfirmationModalBody,
              public router: Router,
              public dialogRef: MatDialogRef<ConfirmComponent>,
  ) {
  }

  ngOnInit() {
  }

  runMethod(method: string, link?: string) {
    this[method](link);
  }

  accept() {
    this.dialogRef.close('accept');
  }

  reject() {
    this.dialogRef.close('reject');
  }

  navigate(link: string) {
    this.dialogRef.close('navigate');
    this.router.navigate([link]);
  }
}
