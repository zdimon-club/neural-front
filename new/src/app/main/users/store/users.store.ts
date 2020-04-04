import { EntityState } from '@ngrx/entity';


export interface UserState extends EntityState<User> {
}

export class User {

  constructor(public id: number  = 0,
              public username: string = null,
              public email: string = null,
              public groups: string[] = null,
              public is_superuser: boolean = null,
              public is_edit: boolean = null,
              public is_online: boolean = false,
              public main_photo: string = null,
              public middle_photo: string = null,
              public main_photo_port: string = null,
              public middle_photo_port: string = null,
              public about_me: string = null,
              public account: number = null,
              public language: string = null,
              public gender: string = null,
              public age: number = null,
              public is_camera: boolean = null,
              public is_subscribed: boolean = null,
              public is_verified: boolean = null,
              public new_messages: number = null,
              public last_feed: string = null) {}
}




export const defaultState = {
};