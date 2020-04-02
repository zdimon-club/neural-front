import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { ReplaySubject, BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IFeed } from './interfaces';

@Injectable()
export class FeedService implements Resolve<any> {
  _camera_emmiter$ = new ReplaySubject();
  onFeedChanged: BehaviorSubject<any>;
  onVideoRecorded: ReplaySubject<any>;
  onPhotoRecorded: ReplaySubject<any>;
  routeParams: any;
  feed: any;

  constructor(private http: HttpClient, public injector: Injector) {
    this.onFeedChanged = new BehaviorSubject({});
    this.onVideoRecorded = new ReplaySubject();
    this.onPhotoRecorded = new ReplaySubject();
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([this.getFeedDetail()]).then(() => {
        resolve();
      }, reject);
    });
  }

  public videoRecorded(data: any) {
    this.onVideoRecorded.next(data);
  }

  public photoRecorded(data: any) {
    this.onPhotoRecorded.next(data);
  }

  public getUserFeedList(page: number, user_id: number) {
    page === 1 ? (page = 0) : (page = page);
    const offset = page * 10;
    return this.http.get(`${environment.apiUrl}/feed/custom/user/${user_id}`);
  }

  public getList(page: number) {
    page === 1 ? (page = 0) : (page = page);
    const offset = page * 10;
    return this.http.get(`${environment.apiUrl}/feed`);
  }

  public getFeedDetail(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === 'new') {
        this.onFeedChanged.next(false);
        resolve(false);
      } else {
        this.http
          .get(`${environment.apiUrl}/feed/custom/detail/${this.routeParams.id}`)
          .subscribe((data: any) => {
            this.feed = data;
            this.onFeedChanged.next(this.feed);
            resolve(data);
          }, reject);
      }
    });
  }

  saveFeed(feed: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/feed/custom/save/`, feed).subscribe((res: any) => {
        resolve(res);
      }, reject);
    });
  }

  addFeed(feed: any) {
    return this.http.post(`${environment.apiUrl}/feed/custom/add/new`, feed);
  }

  removeFeed(feed_id: any) {
    return this.http.get(`${environment.apiUrl}/feed/custom/remove/${feed_id}`);
  }

  addLike(feed_id: any) {
    const data = {
      obj_model: 'userfeed',
      obj_id: feed_id,
    };
    return this.http.post(`${environment.apiUrl}/likes/add/`, data);
  }

  getFeedDetailById(feed_id: number) {
    return this.http.get<IFeed>(`${environment.apiUrl}/feed/custom/detail/${feed_id}`);
  }

  public addComment(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/feed/custom/add/comment`, data);
  }

  public subscribe(id: number) {
    return this.http.get(`${environment.apiUrl}/feed/custom/subscribe/${id}`);
  }

  public unSubscribe(id: number) {
    return this.http.get(`${environment.apiUrl}/feed/custom/unsubscribe/${id}`);
  }
}
