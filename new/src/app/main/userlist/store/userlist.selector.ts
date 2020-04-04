/* author Zharikov Dmitry zdimon77@gmail.com  */

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserlistState } from './userlist.store';
import {selectUsersObjsList} from './../../../main/users/store/users.selector';

export const getUserlistSelector = createFeatureSelector<UserlistState>('userlist');

export const selectUserlistIdsArraySelector = createSelector(
  getUserlistSelector,
  (users: UserlistState) => users.userIDs
);

export const selectUserlistArray = createSelector(
  selectUserlistIdsArraySelector,
  selectUsersObjsList,
  (ids, users) => ids.map((id) => users[id])
);
