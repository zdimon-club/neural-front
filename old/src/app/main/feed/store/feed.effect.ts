import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { FeedService } from './../feed.service';
import * as feedActions from './feed.action';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Store } from '@ngrx/store';
import { UserState } from './../../users/store/users.store';
import { selectUsersIds } from './../../users/store/users.selector';
import * as userAction from '../../users/store/users.action';
import { UpdateUsersDone } from './../../users/store/users.action';

@Injectable()
export class FeedEffects {
  constructor(
    private actions$: Actions,
    private service: FeedService,
    private _snackBar: MatSnackBar,
    private user_state: Store<UserState>
  ) {}


  @Effect()
  getFeedItem$ = this.actions$.pipe(
    ofType(feedActions.ActionTypes.GetFeedRequest),
    withLatestFrom(this.user_state.select(selectUsersIds)),
    switchMap(([payload, users]: any) => {
      return this.service
        .getFeedDetailById(payload.payload)
        .pipe(
          map((rez: any) => {
            const newUserIds = rez.feedcomment.reduce((accum, comment) => {
              if (!users.includes(comment.user)) {
                accum.push(comment.user);
              }
              return accum;
            }, []);
            // add owner user
            // console.log(rez);
            if (!users.includes(rez.user)) {
              newUserIds.push(rez.user);
            }
            if (newUserIds.length > 0) {
              this.user_state.dispatch(new userAction.RequestUser(newUserIds));
            }
            return new feedActions.GetFeedDone(rez);
          })
        );

    })
  );

  @Effect()
  addComment$ = this.actions$.pipe(
    ofType(feedActions.ActionTypes.AddCommentRequest),
    switchMap((payload: any) => {
      return this.service
        .addComment(payload.payload)
        .pipe(
          map((rez: any) => new feedActions.AddCommentDone(rez.comment))
        );
    })
  );


  @Effect()
  loaduserfeedlist$ = this.actions$.pipe(
    ofType(feedActions.ActionTypes.GetUserFeedList),
    withLatestFrom(this.user_state.select(selectUsersIds)),
    switchMap((payload: any, users: any) => {
      return this.service
        .getUserFeedList(payload.payload.page, payload.payload.user_id)
        .pipe(
          map((feed: any) => {
            console.log(users);
            // const newUserIds = feed.feedcomment.reduce((accum, comment) => {
            //   if (comment.user) {
            //     accum.push(comment.user);
            //   }
            //   return accum;
            // }, []);            
            return new feedActions.LoadMyFeedDone(feed)
          
          })
        );

    })
  );


  @Effect()
  myFeedList$ = this.actions$.pipe(
    ofType(feedActions.ActionTypes.LoadMyFeedRequest),
    switchMap((payload: any) => {
      return this.service
        .getList(payload.page)
        .pipe(
          map((feed: any) => new feedActions.LoadMyFeedDone(feed))
        );

    })
  );


  @Effect()
  addLike$ = this.actions$.pipe(
    ofType(feedActions.ActionTypes.AddLikeRequest),
    switchMap((payload: any) => {
      return this.service
        .addLike(payload.payload.id)
        .pipe(
          map((feed: any) => {
            this._snackBar.open(feed.message, 'ok', {
              duration: 2000,
            });
            return new feedActions.AddLikeDone(feed.feed);
          })
        );

    })
  );

  @Effect()
  subscribe$ = this.actions$.pipe(
    ofType(feedActions.ActionTypes.SubscribeRequest),
    switchMap((payload: any) => {
      // console.log(payload);
      if (payload.payload.value) {
        return this.service
          .subscribe(payload.payload.feed.id)
          .pipe(
            map((feed: any) => {
                const data = [feed.user_id];
                // console.log(data);
                tap(() => {
                  return new userAction.RequestUser(data);
                })
                // this.user_state.dispatch(new userAction.RequestUser(data));
                return new feedActions.SubscribeRequestDone({
                user_id: payload.payload.user,
                value: payload.payload.value
              });
            }
            )
          );
      } else {
        return this.service
          .unSubscribe(payload.payload.feed.id)
          .pipe(
            map((feed: any) => {
              const data = [feed.user_id];
              // console.log(data);
              tap(() => {
                return new userAction.RequestUser(data);
              })
              // this.user_state.dispatch(new userAction.RequestUser(data));
              return new feedActions.SubscribeRequestDone({
                user_id: payload.payload.feed.user,
                value: payload.payload.value
              });
            }
          ));
      }

    })
  );


  // @Effect()
  // updateSubsctiption$ = this.actions$.pipe(
  //   ofType(feedActions.ActionTypes.SubscribeRequestDone),
  //   switchMap((payload: any) => {
  //     // return this.service
  //     //   .addComment(payload.payload)
  //     //   .pipe(
  //     //     map((rez: any) => new feedActions.AddCommentDone(rez.comment))
  //     //   );
  //     // tap(() => new userAction.RequestUser([payload.payload.user_id]));
  //     // return new UpdateUsersDone();
  //     // return new userAction.RequestUser([payload.payload.user_id]);
  //     return [];
  //   }),
  //   tap((payload) => this.user_state.dispatch(new userAction.RequestUser([payload.payload.user_id])))
  // );


}


