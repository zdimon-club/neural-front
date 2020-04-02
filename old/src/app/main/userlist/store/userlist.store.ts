export class User {
  constructor(
    public country_string: string = null,
    public main_photo: string = null,
    public middle_photo: string = null,
    public id: number = 0,
    public username: string = null,
    public last_name: string = null,
    public age: number = null,
    public city: string = null,
    public country: string = null,
    public language: string = null,
    public is_online: boolean = false,
    public about_me: string = null,
  ) {}
}

export interface UserlistState {
  userlist: User[];
}

export const defaultState = {
  userlist: [],
};
