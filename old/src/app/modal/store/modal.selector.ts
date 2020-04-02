import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ModalState } from './modal.store';

export const getModalStateSelector = createFeatureSelector<ModalState>('modal');

export const selectModalData = createSelector(
  getModalStateSelector,
  (state: ModalState): any => state
);
