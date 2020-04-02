
// import { VideoService } from './../main/video/video.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from '../../environments/environment';
import { reducers, effects, CustomSerializer } from '.';
// import { PhotoService } from '../main/photo/photo.service';
import { FeedService } from './../main/feed/feed.service';



export const metaReducers: MetaReducer<any>[] = !environment.production
    ? []
    : [];

@NgModule({
    imports  : [
        StoreModule.forRoot(reducers, {metaReducers}),
        EffectsModule.forRoot(effects),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreRouterConnectingModule.forRoot()
    ],
    providers: [
        {
            provide : RouterStateSerializer,
            useClass: CustomSerializer
        },
        // PhotoService,
        // VideoService,
        FeedService
    ]
})

export class AppStoreModule {
}
