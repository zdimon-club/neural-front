import { ActionsUnion, ActionTypes } from './../../../auth/store/session.action';
import { UserActionsUnion, UserActionTypes, UpdateUsers } from './users.action';
import { UserState, User, defaultState } from './users.store';
import * as usersActions from './users.action';

import {EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({});

export const initialState: UserState = adapter.getInitialState();

export function UserReducer(state = initialState, action: usersActions.UserActionsUnion) {

  switch (action.type) {

    case usersActions.UserActionTypes.UpdateUsers:
      return adapter.addMany(action.payload, {...state});

    case usersActions.UserActionTypes.UpdateUser:
      return adapter.upsertOne(action.payload, {...state});

    default:
      return state;
  }
}
