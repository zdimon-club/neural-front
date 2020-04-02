import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { getSessionStateSelector } from './store/session.selector';
import { Store } from '@ngrx/store';
import { SessionService } from './session.service';

// User store
import { UpdateUsers } from '../main/users/store/users.action';
import { UserState } from '../main/users/store/users.store';

import { SessionState } from './store/session.store';
import * as sessionActions from './store/session.action';

@Injectable()
export class InitService {
  constructor(
    private http: HttpClient,
    private sessionStore: Store<SessionState>,
    private sessionService: SessionService,
    private userState: Store<UserState>,
  ) {
    this.sessionStore.select(getSessionStateSelector);
  }

  public init() {
    this.http.get(`${environment.apiUrl}/init`).subscribe(
      (data: any) => {
        if (data.status === 0) {
          /// set session user
          this.sessionStore.dispatch(new sessionActions.Init(data));
          // set online users
          this.userState.dispatch(new UpdateUsers(data.users_online));
        } else {
          this.sessionService.removeToken();
        }
      },
      () => {
        this.sessionService.removeToken();
      },
    );
  }
}
