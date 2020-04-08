import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {CategoryDto} from '../DataDTO/CategoryDto';






@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  constructor(private http: HttpClient) {
  }


  GetPersonalInfo(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(environment.url + 'props/list/female');
  }

  SavePersonalData(postData) {
    return this.http.post( environment.url  + '/props/save', postData)
  }
}
