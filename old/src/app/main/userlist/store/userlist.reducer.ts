import { UserActionsUnion, UserActionTypes } from './userlist.action';
import { UserlistState, defaultState } from './userlist.store';

export function UserlistReducer(state: UserlistState = defaultState, action: UserActionsUnion) {
  const { type, payload } = action;
  switch (type) {
    case UserActionTypes.UpdateUsers:
      return {
        ...state,
        userlist: payload,
      };
    default:
      return state;
  }
}
