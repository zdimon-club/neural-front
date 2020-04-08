

/* author Zharikov Dmitry zdimon77@gmail.com  */
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as userlistActions from './userlist.action';
import { UserlistService } from './../userlist.service';

import { Store } from '@ngrx/store';
import { User } from './../../users/store/users.store';
import * as userActions from './../../users/store/users.action';

@Injectable()
export class UserlistEffects {
  constructor(
    private actions$: Actions,
    private userlistService: UserlistService,
    private userStore: Store<User>
  ) {
  }


  @Effect()
  addComment$ = this.actions$.pipe(
    ofType(userlistActions.ActionTypes.RequestUserlist),
    switchMap((payload: number) => {
      return this.userlistService
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
            return new userlistActions.RequestUserlistDone(userIds);
          })
        );
    })
  );

}
