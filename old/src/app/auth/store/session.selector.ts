import { SessionState } from './session.store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../../main/users/store/users.store';

export const getSessionStateSelector = createFeatureSelector<SessionState>('session');

export const selectIsAuth = createSelector(
    getSessionStateSelector,
    (state: SessionState) => state.is_auth
  );

export const selectUsername = createSelector(
      getSessionStateSelector,
      (state: SessionState) => state.user.username
  );

export const selectToken = createSelector(
    getSessionStateSelector,
    (state: SessionState) => state.token
  );

export const selectUser = createSelector(
    getSessionStateSelector,
    (state: SessionState) => state.user
  );

export const selectAccount = createSelector(
    getSessionStateSelector,
    (state: SessionState) => state.user.account
  );

export const selectOnline = createSelector(
    getSessionStateSelector,
    (state: SessionState) => state.online
  );

  export const selectUi = createSelector(
    getSessionStateSelector,
    (state: SessionState) => state.ui
  );

export const selectLanguage = createSelector(
    selectUser,
    (user: User) => user.language
  );
