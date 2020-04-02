import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import {  Store } from '@ngrx/store';
import { OnlineState } from './store/online.store';
import {environment} from '../../environments/environment';

@Injectable()
export class OnlineService {

  load$: Observable<OnlineState>;


  constructor(
    private http: HttpClient,
    public injector: Injector,
    private store: Store<OnlineState>
  ) {

  }

  public getList() {
    return this.http.get(`${environment.apiUrl}/online/list`);
  }



}
