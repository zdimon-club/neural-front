import { UserService } from './../../users/user.service';
import { HideAbonentCamera, ShowAbonentCamera } from './chat.action';
import { selectOnline } from './../../../auth/store/session.selector';
/* *** author: Dimitry Zharikov zdimon77@gmail.com ***/
import { ChatService } from '../services/chat.service';
import * as roomActions from '../store/chat.action';
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, catchError, tap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { RoomState } from '../store/chat.store';
import { GetRoomList } from '../store/chat.action';

import { UpdateUsers, RequestUser } from '../../users/store/users.action';
import { UserState } from '../../users/store/users.store';
import { selectUsersIds, getUserById } from './../../users/store/users.selector';
import { MediaService } from './../services/media.service';
import {getEmoji} from './chat.selector';

@Injectable()
export class RoomEffects {
  constructor(
    private actions$: Actions,
    private service: ChatService,
    private store: Store<RoomState>,
    private userStore: Store<UserState>,
    public media_service: MediaService,
    public user_service: UserService,
  ) {
  }

  @Effect()
  showAbonentCamera$ = this.actions$.pipe(
    ofType(roomActions.ActionTypes.ShowAbonentCamera),
    switchMap((action: any) => {
      return this.user_service.getDetailUser([action.payload.abonent_id]).pipe(
        map((payload: any) => {
           this.media_service.joinToSession(payload[action.payload.abonent_id].get_token);
          return new roomActions.ProcessAbonentCameraDone();
        }),
      );
    }),
  );

  @Effect()
  hideAbonentCamera$ = this.actions$.pipe(
    ofType(roomActions.ActionTypes.HideAbonentCamera),
    switchMap((action: any) => {
      return this.user_service.getDetailUser([action.payload.abonent_id]).pipe(
        map((payload: any) => {
          this.media_service.deleteSubscriber(action.payload.subscriber);
          return new roomActions.ProcessAbonentCameraDone();
        }),
      );
    }),
  );

  @Effect()
  roomList$ = this.actions$.pipe(
    ofType(roomActions.ActionTypes.GetRoomList),
    switchMap((action: any) => {
      return this.service.getRoomList().pipe(
        tap((payload: any) => {
          this.userStore.dispatch(new UpdateUsers(payload.contact_users))
        }),
        map((payload: any) => new roomActions.GetRoomListLoaded(payload)),
      );
    }),
  );

  @Effect()
  loadOnlineUsers$ = this.actions$.pipe(
    ofType(roomActions.ActionTypes.RequestOnlineUsers),
    switchMap((action: any) => {
      return this.service.getOnline().pipe(
        withLatestFrom(this.userStore.select(selectUsersIds), (payload: any, store: any) => {
          const userIds = [];
          payload.forEach((key) => {
            if (store.indexOf(key) === -1) {
              userIds.push(key);
            }
          });
          if (userIds.length > 0) {
            this.userStore.dispatch(new RequestUser(userIds));
          }
          return new roomActions.OnlineUsersLoaded(payload);
        }),
      );
    }),
  );

  @Effect()
  loadFavoriteUsers$ = this.actions$.pipe(
    ofType(roomActions.ActionTypes.RequestFavoriteUsers),
    switchMap((action: any) => {
      return this.service.getFavorites().pipe(
        withLatestFrom(this.userStore.select(selectUsersIds), (payload: any, store: any) => {
          const userIds = [];
          payload.forEach((key) => {
            if (store.indexOf(key) === -1) {
              userIds.push(key);
            }
          });
          if (userIds.length > 0) {
            this.userStore.dispatch(new RequestUser(userIds));
          }
          return new roomActions.FavoriteUsersLoaded(payload);
        }),
      );
    }),
  );

  @Effect()
  loadEmoji$ = this.actions$.pipe(
    ofType(roomActions.ActionTypes.GetEmojiList),
    withLatestFrom((this.store.select(getEmoji)), (action, { results }) => results.length),
    switchMap((offset: number) => {

      return this.service.getSmiles(offset)
        .pipe(
          map(({ results, ids }) => {
            return new roomActions.GetEmojiListLoaded({ results, ids });
          }),
        );
    }),
  );

  @Effect()
  loadStickers$ = this.actions$.pipe(
    ofType(roomActions.ActionTypes.GetStickersList),
    switchMap(() => {

      return this.service.getStickers()
        .pipe(
          map((payload) => {
            return new roomActions.GetStickersListLoaded(payload);
          }),
        );
    }),
  );
}
