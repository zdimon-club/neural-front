import { User } from './../../../users/store/users.store';
import { EntityState } from '@ngrx/entity';


export interface Event {
  id: number;
  object_id: number;
  type: string;
  user_id: number;
  user_obj?: User;
  message: string;
  created: string;
}



export interface EventsState extends EntityState<Event> {
}

export const default_state = {
};


export class EventModel implements Event {
  id: number;
  object_id: number;
  type: string;
  user_id: number;
  user_obj: User;
  message: string;
  created: string;

  constructor(event?) {

      this.id = event.id || null;
      this.object_id = event.object_id || null;
      this.message = event.message || '';
      this.type = event.type || '';
      this.user_id = event.user || null;
      this.user_obj = event.user_obj || null;
      this.created = event.created || '';

  }


}
