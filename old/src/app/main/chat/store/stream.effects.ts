import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as streamActions from './stream.action';
import { map, switchMap, tap } from 'rxjs/operators';
import { ClearCounter, IncreaseCounter } from './stream.action';
import * as roomActions from './chat.action';
import { MediaService } from '../services/media.service';
import { Store } from '@ngrx/store';
import { SessionState } from '../../../auth/store/session.store';
import * as sessionActions from '../../../auth/store/session.action';

@Injectable()
export class StreamEffects {
  constructor(
    private actions$: Actions,
    public media_service: MediaService,
    private sessionStore: Store<SessionState>,
  ) {
  }

  @Effect({ dispatch: false })
  sendTime$ = this.actions$.pipe(
    ofType(streamActions.ActionTypes.IncreaseCounter),
    tap((action: any) => {
      if (!(action.payload.count % 10)) {
        this.media_service.sendVideoTime({...action.payload}).subscribe((r) => {
          this.sessionStore.dispatch(new sessionActions.UpdateAccount(r.account));
        });
      }
    }),
  );
}
