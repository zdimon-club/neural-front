import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Injector } from '@angular/core';
import { environment } from '../../environments/environment';

import { Store } from '@ngrx/store';
import * as sessionActions from './store/session.action';
import { SessionState } from './store/session.store';
import { getSessionStateSelector } from './store/session.selector';
import { User } from '../main/users/store/users.store';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { SocketService } from '../socket/socket.service';
import { RegistrationService } from '../main/registration/registration.service';

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
    private session_store: Store<SessionState>,
    private session_service: SessionService,
    private socket_service: SocketService,
    private registration_service: RegistrationService,
  ) {
    this.session_store.select(getSessionStateSelector).subscribe((data: SessionState) => {
      this.current_user = data.user;
    });
  }

  // используем http.post() для получения токена
  login(user: { username: string, password: string, socket_id?: string }) {
    this.session_service.removeToken();
    user.socket_id = this.session_service.getSid();
    this.http.post(`${environment.apiUrl}/api-token-auth/`, user)
      .subscribe((data: any) => {
          if (data.status === 1) {
            this._login_emmiter.next({ status: 1, title: 'Account blocked', message: data.message });
            return;
          }
          this.session_service.setToken(data.token);
          this.session_service.setLanguage(data.user.language);
          this.session_store.dispatch(new sessionActions.LogIn(data));

          this.session_store.dispatch(new sessionActions.SetSid({
            token: data.token,
            socket_id: user.socket_id,
          }));
          this.router.navigate(['index']);
        },
        err => {
          //console.log('login error');
          // this._login_emmiter.next({ status: 1, title: 'Login Error', message: 'Invalid login or password' });
          this.errors = err.error;
          // console.log({message: "Login or password incorrect!"});
          this.login_error_emmiter.next({message: "Login or password incorrect!"});
        },
      );
  }

  public logout() {
    this.http.get(`${environment.apiUrl}/logout/`).subscribe((data) => {
      this.session_service.removeToken();
      this.socket_service.reconnect();
      // this._socketService.set_me_offnline(this.current_user.username);
      this.session_store.dispatch(new sessionActions.LogOut());
      this.router.navigate(['/login']);
      this.registration_service.clearRegisterSuggestionPopupTimeout();
      this.registration_service.handleInitRegisterSuggestionPopup();
      // window.location.reload();
    });
  }

  public loginGoogle(user) {
    this.session_service.removeToken();
    user.socket_id = this.session_service.getSid();
    this.http.post(`${environment.apiUrl}/authsocial/google/`, user).subscribe((data: any) => {
      this.session_service.setToken(data.token);
      this.session_service.setLanguage('en');
      this.session_store.dispatch(new sessionActions.LogIn(data));
      this.router.navigate(['index']);
      // window.location.reload();
    });
  }
}
