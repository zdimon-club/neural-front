import { RoomState } from './chat.store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { StreamState } from './stream.store';

export const getStreamStateSelector = createFeatureSelector<StreamState>('streams');

export const selectTimeCounter = createSelector(
  getStreamStateSelector,
  (state: StreamState): number => state.time_counter
);


