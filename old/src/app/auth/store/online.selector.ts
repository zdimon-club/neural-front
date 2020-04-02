import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OnlineState } from './online.store';
// import {getContactsIds} from '../../main/chat/store/chat.selector';
export const getOnlineStateSelector = createFeatureSelector<OnlineState>('online');


export const selectUsersIds = createSelector(
    getOnlineStateSelector,
    (state: OnlineState) => state.users_ids
  );

export const selectUsersList = createSelector(
  getOnlineStateSelector,
  (state: OnlineState) => state.users
  );

export const getUserOnlineList = createSelector(
    selectUsersIds,
    selectUsersList,
    (ids, users) => {
      return ids.map( id => users[id]);
    }
  );

  // export const getUserOnlineExludeList = createSelector(
  //   selectUsersIds,
  //   getContactsIds,
  //   selectUsersList,
  //   (online, contact, ol) => {
  //   return online.filter(id => !contact.includes(id)).map(iddd => ol[iddd]);
  //   }
  // );
