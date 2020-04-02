import { Action } from '@ngrx/store';
import {Video, VideoState} from './video.store';




export enum ActionTypes {
  Add = '[Video] Add photo',
  LoadItems = '[Video] Load photos from server',
  LoadSuccess = '[Video] Load success',
  Delete = '[Video] Delete',
  DeleteSuccess = '[Video] Delete success',
  UpdateVideo = '[Video] Update photo',
}


export class UpdatePhoto implements Action {
  readonly type = ActionTypes.UpdateVideo;
  constructor(public payload: Video) {}
}

export class Delete implements Action {
  readonly type = ActionTypes.Delete;
  constructor(public payload: Video) {}
}

export class DeleteSuccess implements Action {
  readonly type = ActionTypes.DeleteSuccess;
}


export class Add implements Action {
  readonly type = ActionTypes.Add;
  constructor(public payload: Video) {}
}

export class Get implements Action {
  readonly type = ActionTypes.LoadItems;
  constructor(public payload: any) {

  }
}


export class Load implements Action {
  readonly type = ActionTypes.LoadSuccess;

  constructor(public payload: VideoState) {}
}



export type ActionsUnion = Add | Get | Load | Delete | DeleteSuccess | UpdatePhoto
