

// import { UserEffects } from './../../main/users/store/users.effect';
// import { FeedEffects } from './../../main/feed/store/feed.effect';


// import { RoomEffects } from '../../main/chat/store/chat.effect';
// import { SessionEffects } from '../../auth/store/session.effect';
// import { StreamEffects } from '../../main/chat/store/stream.effects';
// import {MessageNotificationEffects} from '../../main/notifications/messages/store/messages.effect';
// import {EventsEffects} from '../../main/notifications/events/store/events.effect';


import { UserlistEffects } from './../../main/userlist/store/userlist.effect';

import { UserOnlineEffects } from './../../main/users/store/usersonline.effect';

export const effects: any[] = [
  // RouterEffects,
  UserlistEffects,
  UserOnlineEffects,
  // PhotoEffects,
  // OnlineEffects,
  // RoomEffects,
  // StreamEffects,
  // SessionEffects,

  // FeedEffects,
  // UserEffects,
  // MessageNotificationEffects,
  // EventsEffects
];

export * from './router.effect';
