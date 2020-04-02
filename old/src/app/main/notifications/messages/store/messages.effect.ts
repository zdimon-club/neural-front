import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionTypes, AddNewMessageNotifications } from './messages.action';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { NotificationService } from '../../notification.service';
import { MessageNotificationModel } from './messages.store';
import { Observable, of } from 'rxjs';


@Injectable()
export class MessageNotificationEffects {
  constructor(
    private actions$: Actions,
    private notification: NotificationService,
  ) {
  }


  @Effect({dispatch: false})
  sendIdNotification$ = this.actions$.pipe(
    ofType(ActionTypes.DeleteMessageNotifications),
    tap((action: any) => {
        this.notification.sendMessageRead({...action.payload}).subscribe((r) => {
          console.log(r);
        });
    }),
  );

  // @Effect()
  // getFeedItem$ = this.actions$.pipe(
  //   ofType(feedActions.ActionTypes.GetFeedRequest),
  //   withLatestFrom(this.user_state.select(selectUsersIds)),
  //   switchMap(([payload, users]: any) => {
  //     return this.service
  //       .getFeedDetailById(payload.payload)
  //       .pipe(
  //         map((rez: any) => {
  //           const newUserIds = rez.feedcomment.reduce((accum, comment) => {
  //             if (!users.includes(comment.user)) {
  //               accum.push(comment.user);
  //             }
  //             return accum;
  //           }, []);
  //           if (!users.includes(rez.user)) {
  //             newUserIds.push(rez.user);
  //           }
  //           if (newUserIds.length > 0) {
  //             this.user_state.dispatch(new userAction.RequestUser(newUserIds));
  //           }
  //           return new feedActions.GetFeedDone(rez);
  //         })
  //       );

  //   })
  // );

  @Effect()
  private requestMessageNotifications$ = this.actions$
    .pipe(
      ofType(ActionTypes.RequestMessageNotifications),
      switchMap(() => {
        return this.notification.getMessageNotification()
          .pipe(
            map((result: any) => {
              const normalizeResult = result.results.map((item) => new MessageNotificationModel(item));
              return new AddNewMessageNotifications(normalizeResult);
            }),
          );
      }),
    );


}


