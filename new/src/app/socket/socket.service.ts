import { Injectable, Inject } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { interval, timer, pipe } from 'rxjs';

import {filter} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';

import { PLATFORM_ID } from '@angular/core';

import { Store } from '@ngrx/store';
import * as sessionActions from '../auth/store/session.action';
import { SessionState } from '../auth/store/session.store';
import { selectToken } from './../auth/store/session.selector';


@Injectable({
  providedIn: "root"
})
export class SocketService {
  private socket;
  isBrowser = false;
  pinger: Subscription;
  token: string;
  
  /// Event observables

  chat$ = new ReplaySubject<Object>();
  notifications$ = new ReplaySubject<Object>();

  constructor(
    @Inject(PLATFORM_ID) protected _platformId: Object,
    private sessionStore: Store<SessionState>,

  ) {

    if (this._platformId === 'browser') {
      this.isBrowser = true;
      this.sessionStore.select(selectToken).subscribe( (data: string) => {
        this.token = data;
      } );
    }

  }

  connect() {

    if (this.isBrowser) {

      this.socket = new WebSocket(`${environment.socketUrl}/chat/`);
      this.dispacher();

      this.socket.onclose = (e) => {
          console.error('Chat socket closed unexpectedly');
          timer(1000).subscribe(() => {
            this.clearTimers();
            this.connect();
          });
      };

      this.socket.onopen = (e) => {
        // console.log('Login from chat');
        this.login();
      };
    }
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


  sendMessage(message: any) {
    this.socket.send(JSON.stringify({ message }));
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

  dispacher(): void {
    this.socket.onmessage = event => {
       const message = JSON.parse(event.data);
       // console.log(message.message.message.action);
       // ну че оно сука так то!!
       if (message.message.message.action === 'broadcast') {
           this.chat$.next(message.message);
       }

       if (message.message.message.action === 'notify') {
        this.notifications$.next(message.message);
       }

    };
  }
  
}