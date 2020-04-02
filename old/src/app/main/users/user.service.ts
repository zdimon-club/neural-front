
import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Injector } from '@angular/core';
import { environment } from '../../../environments/environment';
import {User} from './store/users.store';


@Injectable()
export class UserService {


  constructor(
    private http: HttpClient,
    public injector: Injector
  ) {
  }

  public getUserList(page: number) {
    page === 1 ? page = 0 : page = page;
    const offset = page * 10;
    // todo: probably there is a bug here, pages 10..20 never shown
    return this.http.get(`${environment.apiUrl}/users/?limit=10&offset=${offset}`);
  }

  public saveUser(user: User) {
    return this.http.put(`${environment.apiUrl}/users/${user.id}/`, user);
  }

  public addUser(user: User) {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }


  public getDetailUser(ids: number[]) {
    return this.http.post(`${environment.apiUrl}/account/detail`, ids);
  }
}
