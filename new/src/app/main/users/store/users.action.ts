import { Action } from '@ngrx/store';
import { User, UserState } from './users.store';

export enum UserActionTypes {
  UpdateUsers = '[User] Update users',
  UpdateUsersDone = '[User] Update users DONE!!!',
}

export class UpdateUsers implements Action {
  readonly type = UserActionTypes.UpdateUsers;
  constructor(public payload: any) {}
}

export class UpdateUsersDone implements Action {
  readonly type = UserActionTypes.UpdateUsersDone;
  constructor() {}
}



export type UserActionsUnion =
UpdateUsers |
UpdateUsersDone;
