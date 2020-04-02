import { Action } from '@ngrx/store';
import { User } from './userlist.store';

export enum UserActionTypes {
  UpdateUsers = '[Userlist] Update users',
}

export class UpdateUsers implements Action {
  readonly type = UserActionTypes.UpdateUsers;
  constructor(public payload: User[]) {}
}

export type UserActionsUnion = UpdateUsers;
