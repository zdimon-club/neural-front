import { VideoState, default_state, Video } from './video.store';
import * as Actions from './video.action';


export function VideoReducer(state: VideoState = default_state, action: Actions.ActionsUnion) {

  switch (action.type) {

    case Actions.ActionTypes.LoadSuccess:

      return {
        ...state,
        ids: action.payload.ids,
        results: action.payload.results,

      };

    case Actions.ActionTypes.Add:
      return {
        ...state,
        results: Object.assign({}, state.results, action.payload),
        ids: [ ...state.ids, action.payload.id]

      };

      case Actions.ActionTypes.UpdateVideo:
        return {
          ...state,
          results: Object.assign({}, state.results, action.payload),
  
        };

    /*
    case Actions.ActionTypes.Remove:
      return {
        ...state,
        results: [...state.results.filter(item => item.id !== action.payload.id)]
      };
    */

    default:
      return state;
  }
}
