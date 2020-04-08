
/* author Zharikov Dmitry zdimon77@gmail.com  */
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UsersOnlineState } from './usersonline.store';
import {selectUsersObjsList} from './../../../main/users/store/users.selector';

export const getUserlistSelector = createFeatureSelector<UsersOnlineState>('users_online');

export const selectUserOnlineIdsArraySelector = createSelector(
  getUserlistSelector,
  (users: UsersOnlineState) => users.userIDs
);

export const selectUserOnlineArray = createSelector(
  selectUserOnlineIdsArraySelector,
  selectUsersObjsList,
  (ids, users) => ids.map((id) => users[id])
);
