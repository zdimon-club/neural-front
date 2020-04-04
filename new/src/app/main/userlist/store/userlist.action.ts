/* author Zharikov Dmitry zdimon77@gmail.com  */
import { Action } from '@ngrx/store';
import { UserlistState } from './userlist.store';


export enum ActionTypes {
  RequestUserlist = '[Userlist] Request.',
  RequestUserlistDone = '[Userlist] Request DONE.',
}

export class RequestUserlist implements Action {
  readonly type = ActionTypes.RequestUserlist;
  constructor(page: number) {}
}

export class RequestUserlistDone implements Action {
  readonly type = ActionTypes.RequestUserlistDone;
  constructor(public payload: UserlistState) {}
  
}

export type ActionsUnion =  RequestUserlist  | RequestUserlistDone;
