import { UserActionTypes, UpdateUsers } from './users.action';
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError, mergeMap, concatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private service: UserService) {}

  // @Effect()
  // loadusers$ = this.actions$.pipe(
  //   ofType(UserActionTypes.LoadItems),
  //   switchMap((payload: any) => {
  //     return this.service.getUserList(payload.page).pipe(map((users: any) => new LoadUsers(users)));
  //   }),
  // );

  // @Effect()
  // getDetailUser$ = this.actions$.pipe(
  //   ofType(UserActionTypes.RequestUser),
  //   concatMap((payload: any) => {
  //     return this.service.getDetailUser(payload.payload).pipe(map((user: any) => new UpdateUsers(user)));
  //   }),
  // );


}

@Injectable()
export class UserAddEffects {
  constructor(private actions$: Actions, private service: UserService) {}
}
