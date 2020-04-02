import * as Actions from './modal.action';
import * as State from './modal.store';

export function ModalReducer(state: State.ModalState | null = null, action: Actions.ActionsUnion) {
  switch (action.type) {
    case Actions.ActionTypes.OpenModal:
      return { ...action.payload };
    case Actions.ActionTypes.CloseModal:
      return null;
    default:
      return state;
  }
}
