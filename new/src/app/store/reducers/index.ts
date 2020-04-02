
import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { UserReducer } from '../../main/users/store/users.reducer';
import { UserState } from '../../main/users/store/users.store';

import { SessionReduser } from '../../auth/store/session.reducer';
import { SessionState } from '../../auth/store/session.store';

// import { RoomReducer } from './../../main/chat/store/chat.reducer';
// import { RoomState } from './../../main/chat/store/chat.store';

// import { FeedReducer } from './../../main/feed/store/feed.reducer';
// import { FeedState } from './../../main/feed/store/feed.store';

// import { StreamReducer } from '../../main/chat/store/stream.reducer';
// import { StreamState } from '../../main/chat/store/stream.store';

// import { RegistrationReducer } from '../../main/registration/store/registration.reducer';
// import { RegistrationState } from '../../main/registration/store/registration.store';
// import { ModalState } from '../../modal/store/modal.store';
// import { ModalReducer } from '../../modal/store/modal.reducer';

// import {EventsReducer} from '../../main/notifications/events/store/events.reducer';
// import {EventsState} from '../../main/notifications/events/store/events.store';

// import { MessageNotificationState } from './../../main/notifications/messages/store/messages.store';
// import { MessageNotificationReducer } from './../../main/notifications/messages/store/messages.reducer';





// import {StreamReducer} from './../../main/chat/store/stream.reducer';
// import {StreamState} from './../../main/chat/store/stream.reducer';

// import {VideoReducer} from './../../main/video/store/video.reducer';
// import { VideoState } from './../../main/video/store/video.store';





export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  users: UserState;
  session: SessionState;
  // modal: ModalState;
  // chat: RoomState;
  // events: EventsState;
  // messageNotifications: MessageNotificationState;
  // streams: StreamState;
  // feed: FeedState;
  // registration: RegistrationState;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
  users: UserReducer,
  session: SessionReduser,
  // modal: ModalReducer,
  // chat: RoomReducer,
  // events: EventsReducer,
  // messageNotifications: MessageNotificationReducer,
  // streams: StreamReducer,
  // feed: FeedReducer,
  // registration: RegistrationReducer,
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>(
  'routerReducer',
);

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return {
      url,
      queryParams,
      params,
    };
  }
}
