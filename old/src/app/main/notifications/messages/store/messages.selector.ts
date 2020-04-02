/* author Zharikov Dmitry zdimon77@gmail.com  */

import { MessageNotificationState } from './messages.store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import {selectUsersIDsList} from './../../../../main/users/store/users.selector';

export const getMessageNotificationsStateSelector = createFeatureSelector<MessageNotificationState>('messageNotifications');

export const selectMessageNotificationsIds = createSelector(
  getMessageNotificationsStateSelector,
  (state: MessageNotificationState) => state.ids
);

export const selectMessageNotificationsCount = createSelector(
  selectMessageNotificationsIds,
  getMessageNotificationsStateSelector,
  (ids: number[]) => {
    return ids.length;
  }
);


export const selectMessageNotificationsList = createSelector(
  selectMessageNotificationsIds,
  getMessageNotificationsStateSelector,
  selectUsersIDsList,
  (ids: number[], state: MessageNotificationState, users: any) => {
    return ids.map((id: number) => {
      const item = state.entities[id];
      item.user_obj = users[item.user_id];
      return item;
    });
  }
);




