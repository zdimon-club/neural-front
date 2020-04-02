import { RegistrationState } from './registration.store';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const registrationStateSelector = createFeatureSelector<RegistrationState>('registration');

export const selectIsSuggestionPopupOpened = createSelector(
  registrationStateSelector,
  (state: RegistrationState) => state.is_suggestion_popup_opened,
);

export const selectIsSuggestionPopupMobile = createSelector(
  registrationStateSelector,
  (state: RegistrationState) => state.is_suggestion_popup_mobile,
);
