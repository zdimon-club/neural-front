

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

import { IProps } from './../interfaces/IProps';

import { apiUrls } from './../../../environments/api.urls';




@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  constructor(private http: HttpClient) {
  }


  getProp(gender: string): Observable<IProps[]> {
    return this.http.get<IProps[]>(`${apiUrls.props_list}${gender}`);
  }

  saveProp(postData) {
    return this.http.post(`${apiUrls.props_save}`, postData);
  }
}
