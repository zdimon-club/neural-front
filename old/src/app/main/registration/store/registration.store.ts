export interface RegistrationState {
  is_suggestion_popup_opened: boolean;
  is_suggestion_popup_mobile: boolean;
  email: string;
  gender: string;
  photo: string;
}

export const defaultState = {
  is_suggestion_popup_opened: false,
  is_suggestion_popup_mobile: false,
  email: '',
  gender: 'male',
  photo: ''
};
