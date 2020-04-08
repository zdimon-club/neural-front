/* author Zharikov Dmitry zdimon77@gmail.com  */
import { Action } from '@ngrx/store';
import { UsersOnlineState } from './usersonline.store';


export enum ActionTypes {
  RequestUsersOnline = '[UsersOnline] Request.',
  RequestUsersOnlineDone = '[UsersOnline] Request DONE.',
}

export class RequestUsersOnline implements Action {
  readonly type = ActionTypes.RequestUsersOnline;
  constructor(page: number) {}
}

export class RequestUsersOnlineDone implements Action {
  readonly type = ActionTypes.RequestUsersOnlineDone;
  constructor(public payload: UsersOnlineState) {}

}

export type ActionsUnion =  RequestUsersOnline  | RequestUsersOnlineDone;
