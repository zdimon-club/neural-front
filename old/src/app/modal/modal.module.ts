import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal.component';

@NgModule({
  declarations: [ConfirmComponent, ModalComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [ModalComponent],
  entryComponents: [ConfirmComponent],
})
export class ModalModule {
}
