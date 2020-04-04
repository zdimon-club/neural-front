import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Injector } from '@angular/core';
import { apiUrls } from './../../environments/api.urls';
import { Store } from '@ngrx/store';
import * as sessionActions from './store/session.action';
import { SessionState } from './store/session.store';

import { getSessionStateSelector } from './store/session.selector';
import { User } from '../main/users/store/users.store';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

import { SocketService } from '../socket/socket.service';
import { OnlineSocketService } from './../socket/online.service';

// import { RegistrationService } from '../main/registration/registration.service';

@Injectable()
export class LoginService {
  private _login_emmiter = new ReplaySubject();
  private _logout_emmiter = new ReplaySubject();
  public login_error_emmiter = new ReplaySubject();
  login$ = this._login_emmiter.asObservable();
  logout$ = this._logout_emmiter.asObservable();

  // current user
  public current_user: User;

  // сообщения об ошибках авторизации
  public errors: any = [];

  constructor(
    private http: HttpClient,
    public injector: Injector,
    private router: Router,
    private sessionStore: Store<SessionState>,
    private sessionService: SessionService,
    private socketService: SocketService,
    private onlineSocketService: OnlineSocketService,
    // private registration_service: RegistrationService,
  ) {
    this.sessionStore.select(getSessionStateSelector).subscribe((data: SessionState) => {
      this.current_user = data.user;
    });
  }

  startSocketListiners(){
    // connect online consumer
    this.onlineSocketService.connect();
    // connect chat consumer
    this.socketService.connect();
  }

  // using http.post() for getting token
  login(user: { username: string, password: string, socket_id?: string }) {
    this.sessionService.removeToken();
    user.socket_id = this.sessionService.getSid();
    this.http.post(apiUrls.login_post_form, user)
      .subscribe((data: any) => {
          if (data.status === 1) {
            this._login_emmiter.next({ status: 1, title: 'Account blocked', message: data.message });
            return;
          }
          this.sessionService.setToken(data.token);
          this.sessionService.setLanguage(data.user.language);
          this.sessionStore.dispatch(new sessionActions.LogIn(data));
          this.startSocketListiners();

          this.router.navigate(['index']);
        },
        err => {

          this.errors = err.error;
          this.login_error_emmiter.next({message: "Login or password incorrect!"});
        },
      );
  }

  public logout() {
    this.http.get(apiUrls.logout_get).subscribe((data) => {
      this.sessionService.removeToken();
      this.onlineSocketService.clearTimers();
      this.sessionStore.dispatch(new sessionActions.LogOut());
      this.router.navigate(['/login']);
      // this.registration_service.clearRegisterSuggestionPopupTimeout();
      // this.registration_service.handleInitRegisterSuggestionPopup();

    });
  }

  public loginGoogle(user) {
    this.sessionService.removeToken();
    user.socket_id = this.sessionService.getSid();
    this.http.post(apiUrls.login_google, user).subscribe((data: any) => {
      this.sessionService.setToken(data.token);
      this.sessionService.setLanguage('en');
      this.sessionStore.dispatch(new sessionActions.LogIn(data));
      this.onlineSocketService.disconnect();
      this.socketService.disconnect();
      this.router.navigate(['index']);
      this.startSocketListiners();

      // window.location.reload();
    });
  }
}
