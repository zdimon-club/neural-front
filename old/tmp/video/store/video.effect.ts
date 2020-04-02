import { VideoService } from './../video.service';

import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as VideoActions from './video.action';




@Injectable()
export class VideooEffects {
  constructor(
    private actions$: Actions,
    private service: VideoService
  ) {}

  @Effect()
  loadphotos$ = this.actions$.pipe(
    ofType(VideoActions.ActionTypes.LoadItems),
    switchMap((payload: any) => {
      return this.service
        .getList(payload.page)
        .pipe(
          map((photos: any) => new VideoActions.Load(photos))
        );
    })
  );

 

  @Effect()
  delete$ = this.actions$.pipe(
    ofType(VideoActions.ActionTypes.Delete),
    switchMap((payload: any) => {
      return this.service
        .delete(payload)
        .pipe(
          map(() => new VideoActions.DeleteSuccess())
        );
    })
  );


}


