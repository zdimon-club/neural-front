import { SharedModule } from './../../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgImageSliderModule } from 'ng-image-slider';
import { ClickOutsideModule } from 'ng-click-outside';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material';
import { NgxMasonryModule } from 'ngx-masonry';
import { MasonryGalleryModule } from 'ngx-masonry-gallery';
import { UserlistComponent } from './userlist.component';
import { UserlistCardComponent } from './user-card/user-card.component';
import { UserlistService } from './userlist.service';
import { CatalogService } from '../catalog/catalog.service';

const routes: Routes = [{ path: '', component: UserlistComponent }];

@NgModule({
  declarations: [UserlistComponent, UserlistCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    SharedModule,
    NgImageSliderModule,
    // MatVideoModule,
    MatCardModule,
    MatSelectModule,
    MatSliderModule,
    NgxMasonryModule,
    MasonryGalleryModule,
  ],
  providers: [UserlistService,CatalogService],
  entryComponents: [],
})
export class UserlistModule {}
