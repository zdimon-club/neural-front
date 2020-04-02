
import {Injectable, Inject} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';


@Injectable()
export class SessionService {
  storage: any;
  private isBrowser = false;
  constructor(  private http: HttpClient,
    @Inject(PLATFORM_ID) protected _platformId: Object,
    ) {
    
    this.storage = sessionStorage;
    if (this._platformId === 'browser') {
      this.isBrowser = true;
    }
  }

  getToken(): string {
    if (this.isBrowser) {
      return this.storage.getItem('access_token');
    }
  }

  setToken(value: string) {
    if (this.isBrowser) {
      this.storage.setItem('access_token', value);
    }
  }

  removeToken() {
    if (this.isBrowser) {
      this.storage.removeItem('access_token');
    }
  }


  getSid(): string {
    if (this.isBrowser) {
      return this.storage.getItem('socket_id');
    }
  }

  setSid(value: string) {
    if (this.isBrowser) {
      this.storage.setItem('socket_id', value);
    }
  }

  getLanguage(): string {
    if (this.isBrowser) {
      return this.storage.getItem('lang');
    }
  }

  setLanguage(value: string) {
    if (this.isBrowser) {
     this.storage.setItem('lang', value);
    }
  }

  removeSid() {
    if (this.isBrowser) {
      this.storage.removeItem('socket_id');
    }
  }

  public get isLoggedIn(): Observable<boolean> {
    return of(this.storage.getItem('access_token') !== null);
  }

  public updateSocketId(data: any) {
    return this.http.post(`${environment.apiUrl}/online/update/socket/id`, data);
  }

  public addAccount(data: any) {
    return this.http.post(`${environment.apiUrl}/account/add`, data);
  }

  public setServerLanguage(language: string) {
    return this.http.get(`${environment.apiUrl}/account/setlanguage/${language}`);
  }

  public getOnlineCnt() {
    return this.http.get(`${environment.apiUrl}/online/count`);
  }

}
