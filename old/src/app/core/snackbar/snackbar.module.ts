import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from './../../main/profile/profile.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService } from './snackbar.service';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  providers: [SnackbarService, ProfileService],
  entryComponents: [],
  exports: []
})
export class SnackbarModule { }
