
import { RegisterWomanComponent } from './../../woman/register.woman.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-register-suggestion-popup-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['../register-suggestion-popup.component.scss', './desktop.component.scss'],
})
export class RegisterSuggestionPopupDesktopComponent {
  @Input() form;
  @Input() currentGender;
  @Input() allUsers;
  @Output() emitHandleClickGender: EventEmitter<any> = new EventEmitter();
  @Output() emitHandleClosePopup: EventEmitter<any> = new EventEmitter();
  @Output() emitSubmitLogin: EventEmitter<any> = new EventEmitter();
  @Output() emitSubmitGoogleLogin: EventEmitter<any> = new EventEmitter();
  @Output() emitSubmitLoginAs: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {

  }

  handleClickGender(gender) {
    this.emitHandleClickGender.emit(gender);
    this.handleClosePopup();
  }
  handleClosePopup() {
    this.emitHandleClosePopup.emit();
  }

  showForm(){

    const dialogRef = this.dialog.open(RegisterWomanComponent, {
      height: '400px',
      width: '650px',
    });

  }



}
