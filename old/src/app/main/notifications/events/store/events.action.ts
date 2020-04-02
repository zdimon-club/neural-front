import { EventModel, Event } from './events.store';
import { Action } from '@ngrx/store';



export enum ActionTypes {

  AddNewEvent = '[Events] Add new event',
  // GetChatEvents = '[Events] Get chat events',
  // GetChatEventsSuccess = '[Events] Get chat events',
  // GetEvents = '[Events] Get events',
  RequestEventNotifications = '[Events] Events notification request',
  AddEventNotifications = '[Events] Add new events',
  DeleteEventNotifications = '[Events] Delete evens'
}

export class AddNewEvent implements Action {
  readonly type = ActionTypes.AddNewEvent;
  constructor(public payload: EventModel) {}
}

export class RequestEventNotifications implements Action {
  readonly type = ActionTypes.RequestEventNotifications;
  constructor() {}
}

export class AddEventNotifications implements Action {
  readonly type = ActionTypes.AddEventNotifications;
  constructor(public payload: Event[]) {}
}

export class DeleteEventNotifications implements Action {
  readonly type = ActionTypes.DeleteEventNotifications;
  constructor(public payload: {index: number, notificationId: number}) {}
}


export type ActionsUnion =
  AddNewEvent |
  RequestEventNotifications |
  AddEventNotifications |
  DeleteEventNotifications;

