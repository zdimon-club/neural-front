import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ImageService } from '../../core/services/image.service';
import { SharedModule } from '../../shared.module';
import { RegistrationService } from '../registration/registration.service';
import { CatalogService } from '../catalog/catalog.service';
import { AddPhotoDialogComponent } from './add-photo-dialog/add-photo-dialog.component';
import { AgencyFormComponent } from './edit-profile/agency-form/agency-form.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ManFormComponent } from './edit-profile/man-form/man-form.component';
import { WomanFormComponent } from './edit-profile/woman-form/woman-form.component';
import { ProfileFavoritesComponent } from './favorites/favorites.component';
import { FeedItemComponent } from './feed-item/feed-item.component';
import { FeedComponent } from './feed/feed.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GalleryComponent } from './gallery/gallery.component';
import { InfoComponent } from './info/info.component';
import { MyPhotoComponent } from './my-photo/my-photo.component';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { ProfileSubscriptionsComponent } from './subscriptions/subscriptions.component';
import { UploadPhotoDialogComponent } from './upload-photo-dialog/upload-photo-dialog.component';
import { DetailFormComponent } from './detail-form/detail.form.component';
import { FeedFormComponent } from './feed-form/feed.form.component';
import { FeedPopupComponent } from './feed/popup/feed.popup.component';
import {MatDialogModule} from "@angular/material";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent
  }
];

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    WomanFormComponent,
    AgencyFormComponent,
    ManFormComponent,
    ForgotPasswordComponent,
    UploadPhotoDialogComponent,
    AddPhotoDialogComponent,
    ProfileSubscriptionsComponent,
    ProfileFavoritesComponent,
    FeedComponent,
    FeedItemComponent,
    GalleryComponent,
    InfoComponent,
    MyPhotoComponent,
    DetailFormComponent,
    FeedFormComponent,
    FeedPopupComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ImageCropperModule,
    MatDialogModule
  ],
  providers: [
    ProfileService,
    RegistrationService,
    ImageService,
    CatalogService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  entryComponents: [
    UploadPhotoDialogComponent,
    AddPhotoDialogComponent,
    ForgotPasswordComponent,
    FeedPopupComponent
  ]
})
export class ProfileModule {
}
