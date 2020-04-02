export interface Video {
  id: number;
  video_url: string;
  is_approved: boolean;
  is_deleted: boolean;
  is_converted: boolean;
  get_small_url_land: string;
  get_middle_url_land: string;
}

export interface VideoState {
  count: number;
  ids: number[];
  results: {[id: number]: any};
}

export const default_state = {
  count: 0,
  ids:  [],
  results: {}
}


