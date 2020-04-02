export interface StreamState {
  connections: { [id: number]: any };
  time_counter: number;
}

export const defaultState = {
  connections: {},
  time_counter: 0,
};
