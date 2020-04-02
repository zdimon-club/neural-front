import { Action } from '@ngrx/store';
import { FeedState } from './feed.store';




export enum ActionTypes {
  LoadMyFeedRequest = '[Feed] Load MY feed from server',
  LoadMyFeedDone = '[Feed] Load MY feed DONE!',
  GetUserFeedList = '[Feed] Load user feed success',

  AddCommentRequest = '[Feed] Add comment request',
  AddCommentDone = '[Feed] Add comment DONE!',

  AddLikeRequest = '[Feed] Add like request',
  AddLikeDone = '[Feed] Add like DONE!',

  GetFeedRequest = '[Feed] Get one feed request',
  GetFeedDone = '[Feed] Get one feed DONE!',

  SubscribeRequest = '[Feed] Subscribe request',
  SubscribeRequestDone = '[Feed] Subscribe DONE!'

}

export class SubscribeRequest implements Action {
  readonly type = ActionTypes.SubscribeRequest;
  constructor(public payload: any) {}
}

export class SubscribeRequestDone implements Action {
  readonly type = ActionTypes.SubscribeRequestDone;
  constructor(public payload: any) {}
}


export class GetFeedRequest implements Action {
  readonly type = ActionTypes.GetFeedRequest;
  constructor(public payload: number) {}
}

export class GetFeedDone implements Action {
  readonly type = ActionTypes.GetFeedDone;
  constructor(public payload: any) {}
}

export class AddCommentRequest implements Action {
  readonly type = ActionTypes.AddCommentRequest;
  constructor(public payload: any) {}
}

export class AddCommentDone implements Action {
  readonly type = ActionTypes.AddCommentDone;
  constructor(public payload: any) {}
}


export class AddLikeRequest implements Action {
  readonly type = ActionTypes.AddLikeRequest;
  constructor(public payload: any) {}
}

export class AddLikeDone implements Action {
  readonly type = ActionTypes.AddLikeDone;
  constructor(public payload: any) {}
}



export class GetUserFeedList implements Action {
  readonly type = ActionTypes.GetUserFeedList;
  constructor(public payload: any) {}
}


export class LoadMyFeedRequest implements Action {
  readonly type = ActionTypes.LoadMyFeedRequest;
  constructor(public page: number) {}
}


export class LoadMyFeedDone implements Action {
  readonly type = ActionTypes.LoadMyFeedDone;
  constructor(public payload: FeedState) {}
}





export type ActionsUnion =
LoadMyFeedRequest |
LoadMyFeedDone |
GetUserFeedList |
AddCommentRequest |
AddCommentDone |
AddLikeDone |
GetFeedRequest |
GetFeedDone |
SubscribeRequest |
SubscribeRequestDone |
AddLikeRequest;
