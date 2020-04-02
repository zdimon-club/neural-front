import * as Actions from './stream.action';
import * as State from './stream.store';


// export interface StreamState {
//   connections: { [id: number]: any };
//   time_counter: number;
// }
//
// const defaultState = {
//   connections: {},
//   time_counter: 0,
// };


export function StreamReducer(state: State.StreamState = State.defaultState, action: Actions.ActionsUnion) {

  switch (action.type) {
    case Actions.ActionTypes.AddStream:
      return { ...state, ...action.payload };

    case Actions.ActionTypes.IncreaseCounter:
      return { ...state, time_counter: state.time_counter + 1 };

    case Actions.ActionTypes.ClearCounter:
      return { ...state, time_counter: State.defaultState.time_counter };

    default:
      return state;
  }
}
