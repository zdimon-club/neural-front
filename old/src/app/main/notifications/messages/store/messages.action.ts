import {MessageNotification, MessageNotificationModel} from './messages.store';
import { Action } from '@ngrx/store';



export enum ActionTypes {
  AddNewMessageNotification = '[MessageNotification] Add new message',
  RequestMessageNotifications = '[MessageNotification] Message notification request',
  AddNewMessageNotifications = '[MessageNotification] Add new messages',
  DeleteMessageNotifications = '[MessageNotification] Delete notification'
}

export class AddNewMessageNotification implements Action {
  readonly type = ActionTypes.AddNewMessageNotification;
  constructor(public payload: MessageNotificationModel) {}
}

export class RequestMessageNotifications implements Action {
  readonly type = ActionTypes.RequestMessageNotifications;
  constructor() {}
}

export class AddNewMessageNotifications implements Action {
  readonly type = ActionTypes.AddNewMessageNotifications;
  constructor(public payload: MessageNotification[]) {}
}

export class DeleteMessageNotifications implements Action {
  readonly type = ActionTypes.DeleteMessageNotifications;
  constructor(public payload: {index: number, notificationId: number}) {}
}


export type ActionsUnion =
  AddNewMessageNotification |
  RequestMessageNotifications |
  AddNewMessageNotifications |
  DeleteMessageNotifications;
