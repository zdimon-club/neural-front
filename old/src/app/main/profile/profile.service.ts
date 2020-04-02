import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ReplaySubject } from 'rxjs';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {
  }

  photoUploaded$ = new ReplaySubject();

  public editProfile(data) {
    return of(true);
  }

  public getCountriesList(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/account/countries`);
  }

  public resetPassword(password): Observable<any> {
    return this.http.post(`${environment.apiUrl}/account/save_password`, password);
  }

  public getSubscriptionsList(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/feed/custom/subscribers`);
  }

  public getFavoritesList(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/account/favorites`);
  }

  public getProfileDetail(id: number): Observable<any> {
    const ids = [id];
    return this.http.post(`${environment.apiUrl}/account/detail`, ids);
  }

  public getProfileMyPhoto(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/account/myphoto`);
  }

  public getFeedList(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/feed`);
  }

  public getProfileinfo(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/account/info`);
  }

  public getProfileGallery(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/account/gallery`);
  }

  public savePhoto(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/usermedia/add/image`, data);
  }

  public saveProfile(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/account/save/info`, data);
  }

  public saveDocuments(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/account/save/docs`, data);
  }

  public saveDetail(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/account/save/detail`, data);
  }

  public getLocation(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/account/geolocation`);
  }

}
