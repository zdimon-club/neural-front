import { PostPopupComponent } from './post-popup/post-popup.component';
// import { UserItemComponent } from './../../core/widget/user-item/user-item.component';

import { SearchFormComponent } from './search/search-form.component';
import { SharedModule } from './../../shared.module';
import { CatalogService } from './catalog.service';
import { HelperService } from './../../core/services/helper.service';
import { CatalogComponent } from './catalog.component';
import { CatalogListComponent } from './catalog-list/catalog-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgImageSliderModule } from 'ng-image-slider';
import { ClickOutsideModule } from 'ng-click-outside';
import { FeedService } from '../feed/feed.service';

// import { MatVideoModule } from 'mat-video';
import { MatCardModule } from '@angular/material/card';

import { BaseComponent } from './detail/base.component';
import { FeedComponent } from './../feed/feed.component';
import { DetailPopupFeedComponent } from './../feed/detail/detail.popup.feed.component';
import { FeedVideShowComponent } from './../feed/video.show.component';

import { MatSelectModule } from '@angular/material/select';
import { StoriesComponent } from './detail/stories/stories.component';
import { FavoritesComponent } from './detail/favorites/favorites.component';
import { SubscriptionComponent } from './detail/subscription/subscription.component';
import { AboutComponent } from './detail/about/about.component';
import { GalleryComponent } from './detail/gallery/gallery.component';
import { UploadedPhotoComponent } from './detail/uploaded-photo/uploaded-photo.component';
import { FeedProfileComponent } from './detail/feed-profile/feed-profile.component';
import { MatSliderModule } from '@angular/material';

// popup components
import { MobileHeaderComponent } from './post-popup/parts/mobile.header.component';
import { PostsLeftComponent } from './post-popup/parts/posts.left.component';
import { MediaRightComponent } from './post-popup/parts/media.right.component';
import { MockupCatalogListComponent } from './mockup-catalog-list/mockup-catalog-list.component';

const routes: Routes = [
  { path: 'online/:isOnline', component: CatalogComponent },
  {
    path: 'detail/:id',
    pathMatch: 'full',
    component: BaseComponent,
  },
  {
    path: 'detail/:id/feed/:feedId',
    pathMatch: 'full',
    component: BaseComponent,
  },
  // {
  //   path: 'post/:id',
  //   pathMatch: 'full',
  //   component: PostPopupComponent,
  // },
  {
    path: '**',
    component: CatalogComponent,
    children: [
      {
        path: 'post/:id',
        pathMatch: 'full',
        component: PostPopupComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    // UserItemComponent,
    CatalogComponent,
    SearchFormComponent,
    BaseComponent,
    DetailPopupFeedComponent,
    FeedVideShowComponent,
    FeedComponent,
    StoriesComponent,
    FavoritesComponent,
    SubscriptionComponent,
    AboutComponent,
    GalleryComponent,
    UploadedPhotoComponent,
    FeedProfileComponent,
    CatalogListComponent,
    PostPopupComponent,
    MobileHeaderComponent,
    PostsLeftComponent,
    MediaRightComponent,
    MockupCatalogListComponent,
  ],
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
  ],
  providers: [CatalogService, HelperService, FeedService],
  entryComponents: [DetailPopupFeedComponent, FeedVideShowComponent],
})
export class CatalogModule {}
