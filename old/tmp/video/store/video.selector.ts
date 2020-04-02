import { VideoState } from './video.store';
import { createSelector, createFeatureSelector } from '@ngrx/store';


export const getVideoStateSelector = createFeatureSelector<VideoState>('videos');

export const selectVideoIds = createSelector(
  getVideoStateSelector,
  (state: VideoState) => state.ids
);

export const selectVideoList = createSelector(
  getVideoStateSelector,
  (state: VideoState) => state.results
);

export const getVideoList = createSelector(
  selectVideoIds,
  selectVideoList,
  (ids, videos) => {
    return ids.map( id => videos[id])
  }
)


export const getVideoById = (id) => createSelector(selectVideoList, (allItems) => {
  if (allItems[id]) {
    return allItems[id]
  } else {
    return false;
  }
});
