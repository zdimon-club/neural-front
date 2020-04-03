import { Injectable, Inject } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { interval, timer, pipe } from 'rxjs';

import {filter} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';

import {isPlatformBrowser} from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { Store } from '@ngrx/store';
import * as sessionActions from '../auth/store/session.action';
import { SessionState } from '../auth/store/session.store';
import { selectToken, selectIsAuth } from './../auth/store/session.selector';


@Injectable({
  providedIn: "root"
})
export class OnlineSocketService {
  private socket;
  isBrowser = false;
  pinger: Subscription;
  token: string;
  isAuth = false;


  /// Event observables

  // chat$ = new ReplaySubject<Object>();


  constructor(
    @Inject(PLATFORM_ID) protected _platformId: Object,
    private sessionStore: Store<SessionState>,

  ) {



    if (this._platformId === 'browser') {
      this.isBrowser = true;
      this.sessionStore.select(selectToken).subscribe( (data: string) => {
        this.token = data;
      } );
      this.sessionStore.select(selectIsAuth).subscribe( (data: boolean) => {
        this.isAuth = data;
      } );
    }

  }

  connect() {

    if (this.isBrowser) {

      this.socket = new WebSocket(`${environment.socketUrl}/online/`);
      this.dispacher();

      this.socket.onclose = (e) => {
          console.error('Chat socket closed unexpectedly');
          timer(1000).subscribe(() => {
            this.clearTimers();
            this.connect();
          });
      };

      this.socket.onopen = (e) => {
        if (this.token) this.login();
      };
    }
  }


  setPinger(sid: string){
    // Only if user are authorized!!!
    if (this.isAuth) {
      this.pinger = interval(10000).subscribe((v) => {
          this.socket.send(JSON.stringify({message:
            {
              action: 'ping',
              data: {
                sid,
                token: this.token,
                userAgent: window.navigator.userAgent
              }
            }
          }));

      });
    }
  }

  login(){
    this.socket.send(JSON.stringify({message:
      {
        action: 'login',
        data: {
          token: this.token,
          userAgent: window.navigator.userAgent
        }
      }
    }));
  }


  clearTimers() {
    // может и небыть
    try {
      this.pinger.unsubscribe();
    } catch (error) {

    }
  }

  disconnect(){
    this.socket.close();
    this.clearTimers();
  }

  dispacher(): void {
    this.socket.onmessage = event => {
       const message = JSON.parse(event.data);

       if (message.message.message.action === 'set:sid') {
         this.setPinger(message.message.message.sid);
         this.sessionStore.dispatch(new sessionActions.SetSid(message.message.message.sid));
       }

    };
  }
}