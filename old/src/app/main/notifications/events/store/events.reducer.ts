import {EventsState, Event} from './events.store';
import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import * as Actions from './events.action';


export const adapter: EntityAdapter<Event> = createEntityAdapter<Event>({});

export const initialState: EventsState = adapter.getInitialState();


export function EventsReducer(state = initialState, action: Actions.ActionsUnion) {

  switch (action.type) {

    case Actions.ActionTypes.AddNewEvent:
      return adapter.addOne(action.payload, {...state});
    case Actions.ActionTypes.AddEventNotifications:
      return adapter.addMany(action.payload, {...state});
    case Actions.ActionTypes.DeleteEventNotifications:
      const entities = state.entities;
      const ids = state.ids;
      ids.splice(action.payload.index, 1);
      delete entities[action.payload.notificationId];
      return {...state, entities};
    default:
      return state;
  }
}
