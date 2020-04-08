/* Zharikov Dmitry zdimon77@gmail.com  */

export interface UsersOnlineState {
  userIDs: number[];
  is_loading: boolean;
}

export const defaultState = {
  userIDs: [],
  is_loading: false,
};
