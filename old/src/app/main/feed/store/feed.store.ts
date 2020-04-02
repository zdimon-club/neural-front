import { User } from './../../users/store/users.store';
import { EntityState } from '@ngrx/entity';


export interface FeedMedia {
  id: number;
  likes: number;
  type_media: string;
  get_small_url_port: string;
  get_middle_url_port: string;
  get_small_url_land: string;
  get_middle_url_land: string;
  get_small_url_square: string;
  get_middle_url_square: string;
}

export interface Feed {
  id: number;
  user: number;
  user_obj: User;
  title: string;
  text: string;
  lon: number;
  lat: number;
  likes: number;
  city: string;
  country: string;
  has_video: boolean;
  is_deleted: boolean;
  is_approved: boolean;
  videos: FeedMedia[];
  photos: FeedMedia[];
  feedcomment: any[];
  comment_count: number;
}

export interface FeedState extends EntityState<Feed> {
  ids: number[];
  results: {[id: number]: any};
  results_list: Feed[];
  is_loading: boolean;
}

export const default_state = {
  ids:  [],
  results: {}
};


export class FeedModel implements Feed {
  id: number;
  title: string;
  user: number;
  user_obj: User;
  text: string;
  lon: number;
  lat: number;
  city: string;
  country: string;
  likes: number;
  has_video: boolean;
  is_deleted: boolean;
  is_approved: boolean;
  videos: FeedMedia[];
  photos: FeedMedia[];
  feedcomment: any[];
  comment_count: number;

  constructor(feed?) {
      feed = feed || {};
      this.id = feed.id || null;
      this.title = feed.title || '';
      this.text = feed.text || '';
      this.videos = feed.videos || [];
      this.photos = feed.photos || [];
      this.feedcomment = feed.feedcomment || [];
      this.comment_count = 0;

  }


}
