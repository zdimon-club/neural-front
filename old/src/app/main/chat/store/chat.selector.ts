import { element } from 'protractor';
import { RoomState } from './chat.store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { UserState } from '../../users/store/users.store';

export const getRoomStateSelector = createFeatureSelector<RoomState>('chat');

const getUserStateSelector = createFeatureSelector<UserState>('users');

const selectUsersIDsList = createSelector(
  getUserStateSelector,
  (state: UserState) => state.results
);


export const selectCurrentRoom = createSelector(
    getRoomStateSelector,
    selectUsersIDsList,
    (state: RoomState, users) => {
      const room = state.rooms[state.current_room];
      if (room) {
        const messages = [];

        for (const key in room.messages) {
          if (users[room.messages[key].author_id]) {
            room.messages[key].author = users[room.messages[key].author_id];
            messages.push(room.messages[key]);
          }
        }
        room.messages = messages;
        if (room.abonent_id) {
          room.abonent = users[room.abonent_id];
        }
        return room;
      }
    }
  );



export const getRoomIds = createSelector(
  getRoomStateSelector,
  (state: RoomState) => state.rooms_ids
);

export const getOnlineIds = createSelector(
  getRoomStateSelector,
  (state: RoomState) => state.online_ids
);


export const getContactsIds = createSelector(
  getRoomStateSelector,
  (state: RoomState) => state.contacts_ids
);

export const getRooms = createSelector(
  getRoomStateSelector,
  (state: RoomState) => state.rooms
);

/// Get online list users
export const getOnlineUserList = createSelector(
  getOnlineIds,
  selectUsersIDsList,
  (ids: any, users: any) => {
    return ids.map(id => users[id]);
});

/// Get contact list users
export const getContactUserList = createSelector(
  getContactsIds,
  selectUsersIDsList,
  (ids: any, users: any) => {
    return ids.map(id => users[id]);
});

function getUnique(arr, comp) {
  try {
  const unique = arr
       .map(e => e[comp])

     // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e]);

   return unique;
  } catch {
    return {};
  }
}

/// Get all list users
export const getAllUserList = createSelector(
  getOnlineUserList,
  getContactUserList,
  getRooms,
  (online: any, contact: any, rooms: any) => {
    // console.log(rooms);
    let all = [...online, ...contact];
    const out = {};
    all.forEach((item, index) => {
      if (item !== undefined) {
        for (var key in rooms) {
          if (rooms[key].abonent_id === item.id) {
            if (rooms[key].is_current) {
              item.is_active = true;
            } else {
              item.is_active = false;
            }
            let cnt = 0;
            for (var mkey in rooms[key].messages) {
                if (!rooms[key].messages[mkey].is_readed && rooms[key].messages[mkey].author_id === rooms[key].abonent_id) {
                  cnt = cnt + 1;
                }
            }
            item.new_messages = cnt;
          }
        }
      }
      // console.log(item, index);
      // item.new_messages = 1;
    });
    // return all;
    return getUnique(all,'id');
});



/// Normalize all rooms

export const getRoomList = (owner_id) => createSelector(
  getRoomIds,
  getRooms,
  selectUsersIDsList,
  (ids, rooms, users) => {
    return ids.map( id => {
      console.log(`user id ${owner_id}`);
      const room = rooms[id];
      const messages = [];
      for (const key in room.messages) {
        if (room.messages.hasOwnProperty(key)) {
          messages.push(room.messages[key]);
        }
      }

      room.messages = messages;
      room.abonent = users[room.abonent_id];
      return room;
    });
  }
);

export const getEmoji = createSelector(
  getRoomStateSelector,
  (state: RoomState) => state.smiles.emoji);

export const getEmojiList = createSelector(
  getRoomStateSelector,
  (state: RoomState) => state.smiles.emoji.results);

export const getStickersList = createSelector(
  getRoomStateSelector,
  (state: RoomState) => state.smiles.stickers);
