import { UserEffects } from './../../main/users/store/users.effect';
import { FeedEffects } from './../../main/feed/store/feed.effect';
// import { VideooEffects } from './../../main/video/store/video.effect';
// import { RouterEffects } from './router.effect';
// import { PhotoEffects } from '../../main/photo/store/photos.effect';
// import {OnlineEffects} from '../../auth/store/online.effect';
import { RoomEffects } from '../../main/chat/store/chat.effect';
import { SessionEffects } from '../../auth/store/session.effect';
import { StreamEffects } from '../../main/chat/store/stream.effects';
import {MessageNotificationEffects} from '../../main/notifications/messages/store/messages.effect';
import {EventsEffects} from '../../main/notifications/events/store/events.effect';


export const effects: any[] = [
  // RouterEffects,
  // PhotoEffects,
  // OnlineEffects,
  RoomEffects,
  StreamEffects,
  SessionEffects,
  // VideooEffects,
  FeedEffects,
  UserEffects,
  MessageNotificationEffects,
  EventsEffects
];

export * from './router.effect';
