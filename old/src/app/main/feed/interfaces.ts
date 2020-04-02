export interface IUser {
  country_string: string;
  id: number;
  username: string;
  main_photo: string;
  age: string;  // todo: wtf string, not number
  city: string;
  country: string;
  language: string;
  is_online: boolean;
  about_me: string;
  account: string;
}

export interface IComment {
  id: number;
  feed: number;
  text: string;
  user: number;
}

export interface IVideo {
  id: number;
  type_media: string;
  get_small_url_port: string;
  get_middle_url_port: string;
  get_small_url_land: string;
  get_middle_url_land: string;
  get_small_url_square: string;
  get_middle_url_square: string;
  get_video_url: string;
  orient: string;
}

export interface IPhoto {
  id: number;
  type_media: string;
  get_small_url_port: string;
  get_middle_url_port: string;
  get_small_url_land: string;
  get_middle_url_land: string;
  get_small_url_square: string;
  get_middle_url_square: string;
  get_video_url: null;
  orient: string;
}

export interface IFeed {
  id: number;
  title: string;
  text: string;
  user: IUser;
  is_approved: boolean;
  is_deleted: boolean;
  has_video: boolean;
  feedcomment: IComment[];
  videos: IVideo[];
  photos: IPhoto[];
  lon: string;
  lat: string;
  city: string;
  country: string;
}
