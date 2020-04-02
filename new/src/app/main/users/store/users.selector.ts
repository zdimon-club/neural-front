import { UserState } from './users.store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
// import { getContactsIds } from '../../chat/store/chat.selector';
import * as userActions from './users.action';

export const getUserStateSelector = createFeatureSelector<UserState>('users');

export const selectUsersIds = createSelector(getUserStateSelector, (state: UserState) => state.ids);

export const selectUsersIDsList = createSelector(
  getUserStateSelector,
  (state: UserState) => state.results,
);

export const selectUserList = createSelector(selectUsersIds, selectUsersIDsList, (ids, users) => {
  return ids.map((id) => users[id]);
});

export const selectGalleryUserList = (users: any) =>
  createSelector(selectUsersIDsList, (storeItems) => {
    const out = [];
    for (const key of Object.keys(users)) {
      out.push(storeItems[key]);
    }
    return out;
  });

export const getUserById = (id) =>
  createSelector(selectUsersIDsList, (allItems) => {
    if (allItems[id]) {
      return allItems[id];
    } else {
      return false;
    }
  });

export const getUsers = createSelector(selectUsersIDsList, (allItems) => {
  return Object.values(allItems)
});

/*
export const selectUserOnlineExludeContactList = createSelector(
  selectUserList,
  getContactsIds,
  (users,contacts) => {
  return users.filter(user => user.is_online).filter(user => contacts.indexOf(user.id)==-1);
  }
)
*/
