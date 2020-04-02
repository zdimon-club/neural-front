import { UserlistState } from './userlist.store';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const userlistStateSelector = createFeatureSelector<UserlistState>('userlist');

export const selectUserlist = createSelector(
  userlistStateSelector,
  (state: UserlistState) => state.userlist,
);
