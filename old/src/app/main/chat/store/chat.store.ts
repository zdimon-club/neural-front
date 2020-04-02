import { User } from '../../users/store/users.store';

export interface Message {
  author_id: number;
  id: number;
  author?: User;
  message: string;
  created: string;
  is_readed: boolean;
}

export interface Room {
  id: number;
  messages: {[id: number]: Message};
  abonent_id: number;
  abonent?: User;
  is_active: boolean;
  is_low_account: boolean;
  is_abonent_camera: boolean;
  activity: number;
  new_messages: number;

}

export interface RoomState {
  count: number;
  rooms_ids: number[];
  contacts_ids: number[];
  online_ids: number[];
  rooms: {[id: number]: Room};
  current_room: number;
   smiles: {
    emoji: IEmoji,
    stickers: Array<IStickers>
  };
}

export interface IEmojiItem {
  id: number;
  name: string;
  alias: string;
  image: string;
  type_obj: string;
}

export interface IEmoji {
  results: Array<IEmojiItem>;
  ids: Array<number>;
}

export interface IStickers {
  image: string;
  name: string;
}

export const defaultState: RoomState = {
  count: 0,
  rooms_ids:  [],
  contacts_ids: [],
  online_ids: [],
  rooms: {},
  current_room: null,
  smiles: {
    stickers: [],
    emoji: {
      results: [],
      ids: []
    }
  },
};

