import { SnackbarComponent } from './core/snackbar/snackbar.component';
import { PopupComponent } from './layout/popup/popup.component';
import { UserItemComponent } from './core/widget/user-item/user-item.component';
import { LikeComponent } from './core/widget/like/like.component';
import { ArraySortPipe } from './core/pipes/sortby.pipe';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

// pipes
import { ParseSmilePipe } from './core/pipes/smile.parser.pipe';

// Angular

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Material design

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { ChatPrivateMediaItemComponent } from './main/chat/components/room/private.media.item.component';
import { ChatStageMessageItemComponent } from './main/chat/components/room/message.item.component';
import { PhotoCameraDialogComponent } from './core/components/dialogs/photo.camera.component';
import { VideoCameraDialogComponent } from './core/components/dialogs/video.camera.component';
import { ShowVideoComponent } from './core/components/dialogs/show-video.component';
import { CatalogFilterComponent } from './core/catalog-filter/catalog-filter.component';

import { DropMenuModule } from './core/dropmenu';

@NgModule({
  declarations: [
    ArraySortPipe,
    UserItemComponent,
    ParseSmilePipe,
    SnackbarComponent,
    ChatPrivateMediaItemComponent,
    ChatStageMessageItemComponent,
    PhotoCameraDialogComponent,
    VideoCameraDialogComponent,
    ShowVideoComponent,
    PopupComponent,
    LikeComponent,
    CatalogFilterComponent,
  ],
  imports: [
    TranslateModule.forRoot(),
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  exports: [
    TranslateModule,
    CommonModule,
    FlexLayoutModule,
    ArraySortPipe,
    UserItemComponent,
    FormsModule,
    ReactiveFormsModule,
    ParseSmilePipe,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    SnackbarComponent,
    ChatPrivateMediaItemComponent,
    ChatStageMessageItemComponent,
    ShowVideoComponent,
    PopupComponent,
    LikeComponent,
    RouterModule,
    DropMenuModule,
    CatalogFilterComponent,
  ],
  providers: [],
  entryComponents: [PhotoCameraDialogComponent, VideoCameraDialogComponent],
})
export class SharedModule {}
