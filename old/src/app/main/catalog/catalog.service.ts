// import { User, UserState } from './../users/store/users.store';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  // load$: Observable<UserState>;
  // user$: Observable<User>

  constructor(private http: HttpClient) {}

  public getList(filter: any) {
    const uri = `/online/${filter.online}/agefrom/${filter.age_from}/ageto/${filter.age_to}`;
    return this.http.get(`${environment.apiUrl}/gallery/list${uri}`);
  }

  public get_detail(id: string) {
    return this.http.get(`${environment.apiUrl}/gallery/detail/${id}`);
  }

  public subscribe(id: number) {
    return this.http.get(`${environment.apiUrl}/feed/custom/subscribe/${id}`);
  }

  public unSubscribe(id: number) {
    return this.http.get(`${environment.apiUrl}/feed/custom/unsubscribe/${id}`);
  }

  public addLike(data: any) {
    return this.http.post(`${environment.apiUrl}/likes/add/`,data);
  }

}
