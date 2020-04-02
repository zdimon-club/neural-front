import { Action } from '@ngrx/store';



export enum ActionTypes {
  AddStream = '[Stream] Add stream',
  RemoveStream = '[Stream] Remove stream',
  IncreaseCounter = '[Stream] Increase counter',
  ClearCounter = '[Stream] Clear counter',
  SendTime = '[Stream] Send time'
}



export class AddStream implements Action {
  readonly type = ActionTypes.AddStream;
  constructor(public payload: any) {}
}



export class RemoveStream implements Action {
  readonly type = ActionTypes.RemoveStream;
  constructor(public payload: any) {}
}

export class IncreaseCounter implements Action {
  readonly type = ActionTypes.IncreaseCounter;
  constructor(public payload: {count: number, room_id: number, userId: number}) {
  }
}

export class SendTime implements Action {
  readonly type = ActionTypes.SendTime;
}

export class ClearCounter implements Action {
  readonly type = ActionTypes.ClearCounter;
}

export type ActionsUnion =  AddStream  | RemoveStream | IncreaseCounter | ClearCounter;
