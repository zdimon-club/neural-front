import { Action } from '@ngrx/store';

export enum ActionTypes {
  ToggleSuggestionPopup = '[Registration] Toggle suggestion popup',
  ToggleSuggestionPopupMobile = '[Registration] Toggle suggestion popup mobile',
  SetGender = '[Registration] set Gender',
  SetEmail = '[Registration] set email',
  SetPhoto = '[Registration] set photo',
}

export class ToggleSuggestionPopup implements Action {
  readonly type = ActionTypes.ToggleSuggestionPopup;
  constructor(public payload: { is_opened: boolean }) {}
}
export class ToggleSuggestionPopupMobile implements Action {
  readonly type = ActionTypes.ToggleSuggestionPopupMobile;
  constructor(public payload: { is_mobile: boolean }) {}
}


export class SetGender implements Action {
  readonly type = ActionTypes.SetGender;
  constructor(public payload: { gender: string }) {}
}

export class SetEmail implements Action {
  readonly type = ActionTypes.SetEmail;
  constructor(public payload: { email: string }) {}
}

export class SetPhoto implements Action {
  readonly type = ActionTypes.SetPhoto;
  constructor(public payload: { photo: string }) {}
}


export type ActionsUnion = ToggleSuggestionPopup | ToggleSuggestionPopupMobile | SetGender | SetEmail | SetPhoto;
