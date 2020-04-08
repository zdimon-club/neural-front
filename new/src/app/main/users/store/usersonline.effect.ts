

/* author Zharikov Dmitry zdimon77@gmail.com  */
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as usersonlineActions from './usersonline.action';
import { UserOnlineService } from './../usersonline.service';

import { Store } from '@ngrx/store';
import { User } from './../../users/store/users.store';
import * as userActions from './../../users/store/users.action';

@Injectable()
export class UserOnlineEffects {
  constructor(
    private actions$: Actions,
    private useronlineService: UserOnlineService,
    private userStore: Store<User>
  ) {
  }


  @Effect()
  addComment$ = this.actions$.pipe(
    ofType(usersonlineActions.ActionTypes.RequestUsersOnline),
    switchMap((payload: number) => {
      return this.useronlineService
        .getUserlist(payload)
        .pipe(
          map((rez: any) => {
            const userIds = rez.results.reduce((accum, user) => {
              accum.push(user.id);
              return accum;
            }, []);
            const userListObjsArray = rez.results.reduce((accum, user) => {
              accum.push(user);
              return accum;
            }, []);
            this.userStore.dispatch(new userActions.UpdateUsers(userListObjsArray));
            return new usersonlineActions.RequestUsersOnlineDone(userIds);
          })
        );
    })
  );

}
