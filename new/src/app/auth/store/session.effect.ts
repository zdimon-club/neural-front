
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import {SessionService} from '../session.service';
import * as sessionActions from './session.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class SessionEffects {
  constructor(
    private actions$: Actions,
    private service: SessionService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  @Effect()
  updateSocketId$ = this.actions$.pipe(
    ofType(sessionActions.ActionTypes.SetSID),
    switchMap((action: any) => {
      return this.service
        .updateSocketId(action.payload).pipe(
          map((room: any) => new sessionActions.SidDone())
        );
    })
  );


  @Effect()
  addAccount$ = this.actions$.pipe(
    ofType(sessionActions.ActionTypes.AddAccount),
    switchMap((action: any) => {
      return this.service
        .addAccount(action.payload).pipe(
          map((user: any) => new sessionActions.AddAccountSuccess(user))
        );
    })
  );

  @Effect()
  showAlert$ = this.actions$.pipe(
    ofType(sessionActions.ActionTypes.ShowAlert),
    switchMap((action: any) => {
      return this.service
        .addAccount(action.payload).pipe(
          map((user: any) => new sessionActions.ShowAlertDone())
        );
    })
  );



  @Effect()
  setLanguage$ = this.actions$.pipe(
    ofType(sessionActions.ActionTypes.SetLanguage),
    switchMap((action: any) => {
      return this.service
        .setServerLanguage(action.payload).pipe(
          map((user: any) => {
            console.log(action.payload);
            this.translate.use('ru');
            return new sessionActions.SetLanguageDone()
          })
        );
    })
  );

}


