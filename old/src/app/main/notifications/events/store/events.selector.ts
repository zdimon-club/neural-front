/* author Zharikov Dmitry zdimon77@gmail.com  */

import { EventsState } from './events.store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import {selectUsersIDsList} from './../../../../main/users/store/users.selector';

export const getEventsStateSelector = createFeatureSelector<EventsState>('events');

export const selectEventsIds = createSelector(
  getEventsStateSelector,
  (state: EventsState) => state.ids
);

export const selectEventsCount = createSelector(
  selectEventsIds,
  getEventsStateSelector,
  (ids: number[]) => {
    return ids.length;
  });




export const selectEventsList = createSelector(
  selectEventsIds,
  getEventsStateSelector,
  selectUsersIDsList,
  (ids: number[], state: EventsState, users: any) => {
    return ids.map((id: number) => {
      const item = state.entities[id];
      item.user_obj = users[item.user_id];
      return item;
    });
  }
);




