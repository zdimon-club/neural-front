import { UsersOnlineState } from './usersonline.store';
/* author Zharikov Dmitry zdimon77@gmail.com  */
/* author Zharikov Dmitry zdimon77@gmail.com  */

import * as State from './usersonline.store';
import * as Actions from './usersonline.action';

export function UsersOnlineReducer(
  state: State.UsersOnlineState = State.defaultState,
  action: Actions.ActionsUnion) {

  switch (action.type) {
    case Actions.ActionTypes.RequestUsersOnlineDone:
      return Object.assign({}, state, {userIDs: action.payload});

    default:
      return state;
  }
}
