import * as Actions from './chat.action';
import {RoomState, defaultState} from './chat.store';
import { MessageSent } from './chat.action';



export function RoomReducer(state: RoomState = defaultState, action: Actions.ActionsUnion) {

  switch (action.type) {

    case Actions.ActionTypes.UpdateRoom:
      // console.log('Updating room reducer')
      /*
      for (var key in state.rooms) {
        if(state.rooms[key].abonent === action.payload[Object.keys(action.payload)[0]].id)
        {
          state.rooms[key].abonent = action.payload[Object.keys(action.payload)[0]].id;
        }
      }
      */
      state.rooms[action.payload.id] = action.payload;
      return {
        ...state,
        rooms: {...state.rooms}
      };

      case Actions.ActionTypes.SetCurrentRoom:
        const uprooms = {}
        for (var key in state.rooms) {
          if(key === action.payload.toString()) {
            uprooms[key] = Object.assign({}, state.rooms[key], {is_current: true});
          } else {
            uprooms[key] = Object.assign({}, state.rooms[key], {is_current: false});
          }
        }
        return {
          ...state,
          rooms: Object.assign({}, uprooms),
          current_room: action.payload,
        };

        case Actions.ActionTypes.SetAbonentCamera:
          const updated_room = Object.assign({}, state.rooms[action.payload.room_id]);
          const room_list = state.rooms;
          room_list[action.payload.room_id] = updated_room;
          updated_room.is_abonent_camera = action.payload.value;
          return {
            ...state,
            rooms: Object.assign({}, room_list),
          };

      case Actions.ActionTypes.OnlineUsersLoaded:
        return {
          ...state,
          online_ids: action.payload,
        };

      case Actions.ActionTypes.FavoriteUsersLoaded:
        return {
          ...state,
          contacts_ids: action.payload,
        };

      case Actions.ActionTypes.SendMessage:
          // console.log('SendMessage room reducer')
          const rm = Object.assign({}, state.rooms[action.payload.room_id].messages);
          // console.log(state.rooms[action.payload.room_id].messages)

          const nm = {
            message: action.payload.message,
            author_id: action.payload.user_id,
            id: action.payload.id,
            created: action.payload.created,
            is_readed: action.payload.is_readed,
          };
          rm[action.payload.id] = nm;
          // console.log(rm)
          // state.rooms[action.payload.room_id].messages[action.payload.id] = nm;
          // state.rooms[action.payload.room_id].messages = desmessages;

          return state;



          case Actions.ActionTypes.GetMessage:
            // console.log('GetMessage room reducer')
            const outrooms = {...state};
            const newroom = outrooms.rooms[action.payload.room_id];
            const mes = {
              message: action.payload.message,
              author_id: action.payload.user.id,
              created: action.payload.time,
              is_readed: action.payload.is_readed,
              id: action.payload.id
            };
            newroom.messages[action.payload.message.id] = mes;
            outrooms.rooms[action.payload.room_id] = newroom;
            return outrooms;

          case Actions.ActionTypes.GetRoomListLoaded:

            const rooms = {
              ...state,
              rooms_ids: action.payload.room_ids,
              rooms: action.payload.rooms,
              current_room: action.payload.current_room
            };
            return rooms;
    case Actions.ActionTypes.GetEmojiListLoaded:
      return {
        ...state,
        smiles: {
          ...state.smiles,
          emoji: {
            results: state.smiles.emoji.results.concat(Object.values(action.payload.results)),
            ids: state.smiles.emoji.ids.concat(action.payload.ids)
          }
        }
      };
    case Actions.ActionTypes.GetStickersListLoaded:
      return {
        ...state,
        smiles: {
          ...state.smiles,
          stickers: state.smiles.stickers.concat(action.payload)
        }
      };
    default:
      return state;
  }
}
