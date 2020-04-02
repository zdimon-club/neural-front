import * as Actions from './registration.action';
import * as State from './registration.store';

export function RegistrationReducer(
  state: State.RegistrationState = State.defaultState,
  action: Actions.ActionsUnion,
) {
  switch (action.type) {

    case Actions.ActionTypes.ToggleSuggestionPopup:
      return { ...state, is_suggestion_popup_opened: action.payload.is_opened };

    case Actions.ActionTypes.ToggleSuggestionPopupMobile:
      return { ...state, is_suggestion_popup_mobile: action.payload.is_mobile };

    case Actions.ActionTypes.SetGender:
      return { ...state, gender: action.payload.gender };

    case Actions.ActionTypes.SetPhoto:
      return { ...state, photo: action.payload.photo };

    case Actions.ActionTypes.SetEmail:
      return { ...state, email: action.payload.email };
    
    default:
      return state;
  }
}
