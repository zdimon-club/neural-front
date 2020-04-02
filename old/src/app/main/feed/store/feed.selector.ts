/* author Zharikov Dmitry zdimon77@gmail.com  */

import { FeedState } from './feed.store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import {selectUsersIDsList} from './../../../main/users/store/users.selector';

export const getFeedStateSelector = createFeatureSelector<FeedState>('feed');

export const selectFeedsIds = createSelector(
  getFeedStateSelector,
  (state: FeedState) => state.ids
);

export const selectFeedList = createSelector(
  getFeedStateSelector,
  (state: FeedState) => state.entities
);

export const selectFeedById =  (id: number) => createSelector(
  getFeedStateSelector,
  selectUsersIDsList,
  (state: FeedState, users: any) => {
    if (state.entities.hasOwnProperty(id)) {
      const item_feed = state.entities[id];
      item_feed.user_obj = users[item_feed.user];
      item_feed.feedcomment.map((el) => {
        el.user_obj = users[item_feed.user];
      });
      item_feed.comment_count = item_feed.feedcomment.length;
      return item_feed;
    }
  }
);


export const getFeedList = createSelector(
  selectFeedsIds,
  selectFeedList,
  (ids, feed) => {
    return ids.map( id => feed[id]);
  }
);
