import { getVideoById } from './store/video.selector';
import { Store } from '@ngrx/store';
import { Video, VideoState } from './store/video.store';
import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Injector } from '@angular/core';
import {ReplaySubject} from 'rxjs';
import { environment } from '../../../environments/environment';




@Injectable()
export class VideoService {

  videosaved$ = new ReplaySubject()
  constructor(
    private http: HttpClient,
    public injector: Injector,
    private store: Store<VideoState>
  ) {

  }


  public getList(page:number) {
    page==1 ? page = 0: page = page;
    let offset = page*10;
    return this.http.get(`${environment.apiUrl}/usermedia/video`);
  }

  public detail(id:number) {
    return this.http.get(`${environment.apiUrl}/usermedia/video/detail/${id}`)
  }

  /*
  public detail(id:number) {
    this.store.select(getVideoById(id)).subscribe((data) => {
      if(data) {
        return data;
      } else {
        return this.http.get(`${environment.apiUrl}/usermedia/video/detail/${id}`).subscribe((data)=>{
          return data;
        });
      }
    });
    
  }
  */

  public save(photo: Video){
    return this.http.put(`${environment.apiUrl}/usermedia/video/${photo.id}/`,photo);
  }

  public add(photo: Video){
    return this.http.post(`${environment.apiUrl}/usermedia/video`,photo);
  }


  public delete(photo: Video){
    return this.http.post(`${environment.apiUrl}/video`,photo);
  }

  
  public saveVideo(data: any){
    return this.http.post(`${environment.apiUrl}/usermedia/video`,data).subscribe(data => {
      this.videosaved$.next(data);
    });
  }

  public sendModerate(data: any) {
    return this.http.post(`${environment.apiUrl}/moderate/video`, data);
  }
}
