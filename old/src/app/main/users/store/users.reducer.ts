import { UserActionsUnion, UserActionTypes } from './users.action';
import { UserState, User, defaultState } from './users.store';




export function UserReducer(state: UserState = defaultState, action: UserActionsUnion) {
  switch (action.type) {
    case UserActionTypes.LoadSuccess:
      return {
        ...state,
        ids: action.payload.ids,
        results: action.payload.results,
      };

    case UserActionTypes.UpdateUsers:
        const oldids = [...state.ids];
        const arrUsers =  Object.keys(action.payload)
          .reduce((acc, val) => {
            acc.push(action.payload[val].id);
            return acc;
          }, []);
        arrUsers.forEach((value) => {
          if (oldids.indexOf(value) === -1) {
            oldids.push(value);
          }
        });

        return {
          ...state,
          ids: oldids,
          results: Object.assign({}, state.results, action.payload)
        };
    /*
    case UserActionTypes.Remove:
      return {
        ...state,
        results: [...state.results.filter(item => item.id !== action.payload.id)]
      };
    */

    default:
      return state;
  }
}
