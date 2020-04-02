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
export class UserlistService {
  
  constructor(private http: HttpClient) {}

  public getList() {
    // const uri = `/userlist`;
    return this.http.get(`${environment.apiUrl}/userlist/all`);
  }

}
