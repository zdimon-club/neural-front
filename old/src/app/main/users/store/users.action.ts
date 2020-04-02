import { Action } from '@ngrx/store';
import { User, UserState } from './users.store';

export enum UserActionTypes {
  UpdateUsers = '[User] Update users',
  Remove = '[User] Remove from cart',
  LoadItems = '[User] Load items from server',
  GetUser = '[User] Get user data',
  LoadSuccess = '[User] Load success',
  RequestUser = '[User] Request user from server',
  RequestUserSuccess = '[User] Success request user from server',
  UpdateUsersDone = '[User] Update users DONE',

}

export class UpdateUsersDone implements Action {
  readonly type = UserActionTypes.UpdateUsersDone;
  constructor(public payload: number) {}
}

export class RequestUser implements Action {
  readonly type = UserActionTypes.RequestUser;
  constructor(public payload: number[]) {}
}


export class UpdateUsers implements Action {
  readonly type = UserActionTypes.UpdateUsers;
  constructor(public payload: { [id: number]: User }) {}
}

export class GetUsers implements Action {
  readonly type = UserActionTypes.LoadItems;
  constructor(public page: number) {}
}

export class GetUser implements Action {
  readonly type = UserActionTypes.GetUser;
  constructor(public user: User) {}
}

export class RemoveUser implements Action {
  readonly type = UserActionTypes.Remove;

  constructor(public payload: User) {}
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadSuccess;

  constructor(public payload: UserState) {}
}

export type UserActionsUnion =
GetUser |
GetUsers |
LoadUsers |
RemoveUser |
UpdateUsers |
UpdateUsersDone;
