/* author Zharikov Dmitry zdimon77@gmail.com  */
/* author Zharikov Dmitry zdimon77@gmail.com  */

import * as State from './userlist.store';
import * as Actions from './userlist.action';

export function UserlistReducer(
  state: State.UserlistState = State.defaultState,
  action: Actions.ActionsUnion) {

  switch (action.type) {
    case Actions.ActionTypes.RequestUserlistDone:
      return Object.assign({}, state, {userIDs: action.payload}); 

    default:
      return state;
  }
}
