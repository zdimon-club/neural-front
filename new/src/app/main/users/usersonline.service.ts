import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from './../../../environments/api.urls';

@Injectable()
export class UserOnlineService {

    constructor(
        private http: HttpClient,

      ) {

      }

      public getUserlist(page: number) {
        page === 1 ? (page = 0) : (page = page);
        const offset = page * 10;
        return this.http.get(apiUrls.userlist_online);
      }

}