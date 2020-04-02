import {MessageNotificationState, MessageNotification} from './messages.store';
import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import * as Actions from './messages.action';


export const adapter: EntityAdapter<MessageNotification> = createEntityAdapter<MessageNotification>({});

export const initialState: MessageNotificationState = adapter.getInitialState();


export function MessageNotificationReducer(state = initialState, action: Actions.ActionsUnion) {

  switch (action.type) {

    case Actions.ActionTypes.AddNewMessageNotification:
      return adapter.addOne(action.payload, {...state});
    case Actions.ActionTypes.AddNewMessageNotifications:
      return adapter.addMany(action.payload, {...state});
    case Actions.ActionTypes.DeleteMessageNotifications:
      const entities = state.entities;
      const ids = state.ids;
      ids.splice(action.payload.index, 1);
      delete entities[action.payload.notificationId];
      return {...state, entities};
    default:
      return state;
  }
}
