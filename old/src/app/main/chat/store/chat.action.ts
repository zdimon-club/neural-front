import { Action } from '@ngrx/store';
import {RoomState, Room, IEmojiItem, IStickers} from './chat.store';
import {User} from '../../users/store/users.store';



export enum ActionTypes {
  SetCurrentRoom = '[Chat] Set current room',
  SendMessage = '[Chat] Send message',
  GetMessage = '[Chat] Get message from socket',
  MessageSent = '[Chat] Message sent',
  GetRoomList = '[Chat] Get room list',
  GetRoomListLoaded = '[Room] Room list loaded',
  RoomSelected = '[Chat] Room selected',
  UpdateRoom = '[Chat] Update room',
  CloseRoom = '[Chat] Close room',
  CloseRoomDone = '[Chat] Close room Done!',


  RequestOnlineUsers = '[Chat] Request online users from server',
  OnlineUsersLoaded = '[Chat] Online users loaded',

  RequestFavoriteUsers = '[Chat] Request Faforite users from server',
  FavoriteUsersLoaded = '[Chat] Faforite users loaded',

  SetAbonentCamera = '[Chat] Set abonent camera',
  ShowAbonentCamera = '[Chat] Show abonent camera',
  HideAbonentCamera = '[Chat] Hide abonent camera',
  ProcessAbonentCameraDone = '[Chat] ProcessAbonentCameraDone',

  GetEmojiList = '[Chat] Get emoji',
  GetEmojiListLoaded = '[Chat] Emoji successfully loaded',
  GetStickersList = '[Chat] Get stickers',
  GetStickersListLoaded = '[Chat] Stickers successfully loaded'
}

export class ProcessAbonentCameraDone implements Action {
  readonly type = ActionTypes.ProcessAbonentCameraDone;
}


export class ShowAbonentCamera implements Action {
  readonly type = ActionTypes.ShowAbonentCamera;
  constructor(public payload: {room_id, abonent_id}) {}
}

export class HideAbonentCamera implements Action {
  readonly type = ActionTypes.HideAbonentCamera;
  constructor(public payload: {abonent_id, room_id, subscriber: any}) {}
}




export class SetAbonentCamera implements Action {
  readonly type = ActionTypes.SetAbonentCamera;
  constructor(public payload: any) {}
}

export class UpdateRoom implements Action {
  readonly type = ActionTypes.UpdateRoom;
  constructor(public payload: any) {}
}

export class CloseRoom implements Action {
  readonly type = ActionTypes.CloseRoom;
  constructor(public payload: any) {}
}

export class CloseRoomDone implements Action {
  readonly type = ActionTypes.CloseRoom;
}

export class MessageSent implements Action {
  readonly type = ActionTypes.MessageSent;
}

export class SetCurrentRoom implements Action {
  readonly type = ActionTypes.SetCurrentRoom;
  constructor(public payload: number) {}
}

export class SendMessage implements Action {
  readonly type = ActionTypes.SendMessage;
  constructor(public payload: any) {}
}

export class GetMessage implements Action {
  readonly type = ActionTypes.GetMessage;
  constructor(public payload: any) {}
}

export class GetRoomList implements Action {
  readonly type = ActionTypes.GetRoomList;
}

export class RoomSelected implements Action {
  readonly type = ActionTypes.RoomSelected;
  constructor(public payload: any) {}
}

export class GetRoomListLoaded implements Action {
  readonly type = ActionTypes.GetRoomListLoaded;
  constructor(public payload: any) {}
}

export class RequestOnlineUsers implements Action {
  readonly type = ActionTypes.RequestOnlineUsers;
}

export class OnlineUsersLoaded implements Action {
  readonly type = ActionTypes.OnlineUsersLoaded;
  constructor(public payload: number[]) {}
}

export class RequestFavoriteUsers implements Action {
  readonly type = ActionTypes.RequestFavoriteUsers;
}

export class FavoriteUsersLoaded implements Action {
  readonly type = ActionTypes.FavoriteUsersLoaded;
  constructor(public payload: number[]) {}
}

export class GetEmojiList {
  readonly type = ActionTypes.GetEmojiList;

  constructor() {}
}

export class GetEmojiListLoaded {
  readonly type = ActionTypes.GetEmojiListLoaded;

  constructor(public payload: {results: Array<IEmojiItem>, ids}) {}
}

export class GetStickersList {
  readonly type = ActionTypes.GetStickersList;

  constructor() {}
}

export class GetStickersListLoaded {
  readonly type = ActionTypes.GetStickersListLoaded;

  constructor(public payload: Array<IStickers>) {}
}

export type ActionsUnion =  SetCurrentRoom  |
SendMessage |
MessageSent |
GetRoomList |
GetRoomListLoaded |
GetMessage |
RoomSelected |
RequestOnlineUsers |
OnlineUsersLoaded |
RequestFavoriteUsers |
FavoriteUsersLoaded |
SetAbonentCamera |
ShowAbonentCamera |
ShowAbonentCamera |
ProcessAbonentCameraDone |
CloseRoom |
CloseRoomDone |
UpdateRoom |
GetEmojiList |
GetEmojiListLoaded |
GetStickersList |
GetStickersListLoaded;
