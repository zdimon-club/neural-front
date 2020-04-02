import { Action } from '@ngrx/store';
import * as State from './modal.store';

export enum ActionTypes {
  OpenModal = '[Modal] Open',
  CloseModal = '[Modal] Close',
}

export class OpenModal implements Action {
  readonly type = ActionTypes.OpenModal;

  constructor(public payload: State.ModalState) {
  }
}

export class CloseModal implements Action {
  readonly type = ActionTypes.CloseModal;
}

export type ActionsUnion = OpenModal | CloseModal;
