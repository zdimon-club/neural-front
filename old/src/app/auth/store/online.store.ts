import { User } from '../../main/users/store/users.store';

export interface OnlineState {
  users_ids: number[];
  users: {[id: number]: User};
}

export const defaultState = {
  users_ids: [],
  users: {}
};

