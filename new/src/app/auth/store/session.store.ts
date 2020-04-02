import { User } from '../../main/users/store/users.store';

export interface SessionState {
  sid: string;
  token: string;
  is_auth: boolean;
  online: number;
  user: User | any;
  ui: {
    hide_header: boolean;
    hide_footer: boolean;
  };
}

export const defaultState = {
  sid: '',
  token: '',
  is_auth: false,
  online: 0,
  user: {},
  ui: {
    hide_header: false,
    hide_footer: false,
  },
};
