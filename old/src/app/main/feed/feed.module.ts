
import { environment } from './../../../environments/environment';
import { ShowVideoComponent } from './edit/camera/show.video.component';
import { ImageService } from './../../core/services/image.service';
import { EditFeedComponent } from './edit/edit.feed.component';
import { FeedListComponent } from './list/list.feed.component';
import { FeedService } from './feed.service';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PhotoCameraDialogComponent } from './edit/camera/photo.camera.component';
import { VideoCameraDialogComponent } from './edit/camera/video.camera.component';

import { NgImageSliderModule } from 'ng-image-slider';


const routes: Routes = [
  {
      path     : 'edit/:id',
      component: EditFeedComponent,
      children : [],
      resolve  : {
        data: FeedService
      }
  },
  {
      path     : '**',
      component: FeedListComponent,
      children : []
  }
];


@NgModule({
  declarations: [
    FeedListComponent,
    EditFeedComponent,
    PhotoCameraDialogComponent,
    VideoCameraDialogComponent,
    ShowVideoComponent
  ],
  imports: [
      TranslateModule.forRoot(),
      RouterModule.forChild(routes),
      CommonModule,
      FlexLayoutModule,
      ReactiveFormsModule,
      MatCardModule,
      MatFormFieldModule,
      MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatDialogModule,
      MatInputModule,
      MatTableModule,
      MatTabsModule,
      MatSnackBarModule,
      NgImageSliderModule,

  ],
  exports: [
      TranslateModule,
      CommonModule,
      FlexLayoutModule,
      ReactiveFormsModule,
  ],
  providers: [
    FeedService,
    ImageService

  ],
  entryComponents: [
    PhotoCameraDialogComponent,
    VideoCameraDialogComponent,
    ShowVideoComponent
  ]
})

export class FeedModule { }
