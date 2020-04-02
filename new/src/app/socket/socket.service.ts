import { Injectable, Inject } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { interval, timer, pipe } from 'rxjs';

import {filter} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';

import {isPlatformBrowser} from '@angular/common';
import { PLATFORM_ID } from '@angular/core';


@Injectable({
  providedIn: "root"
})
export class SocketService {
  private socket;
  isBrowser = false;
  pinger: Subscription;
  /// Event observables

  chat$ = new ReplaySubject<Object>();
  notifications$ = new ReplaySubject<Object>();

  constructor(
    @Inject(PLATFORM_ID) protected _platformId: Object,

  ) {

    if(this._platformId === 'browser') {
      this.connect();
    } else {
      console.log(this._platformId);
      console.log(this.isBrowser);
    }
    const isBrowser = isPlatformBrowser(this._platformId);
  }

  connect() {
    this.socket = new WebSocket(`${environment.socketUrl}/chat/`);
    this.dispacher();


    this.socket.onclose = (e) => {
        console.error('Chat socket closed unexpectedly');
        timer(1000).subscribe(() => {
          // может и небыть
          try {
            this.pinger.unsubscribe();
          } catch (error) {

          }

          this.connect();
        })
    };

    this.socket.onopen = (e) => {
       console.log('Try connect!!!');

      //  this.pinger = interval(10000).subscribe((v) => {
      //       console.log(v);
      //       this.socket.send(JSON.stringify({message:
      //         {
      //           action: 'ping',
      //           data: ['this is me']
      //         }
      //       }));

      //  });

    };
  }

  sendMessage(message: any) {
    this.socket.send(JSON.stringify({ message: message }));
  }


  dispacher(): void {
    this.socket.onmessage = event => {
       const message = JSON.parse(event.data);
       console.log(message.message.message.action);
       // ну че оно сука так то!!
       if (message.message.message.action === 'broadcast') {
           this.chat$.next(message.message);
       }

       if (message.message.action === 'notify') {
        this.notifications$.next(message.message);
       }

    };
  }
  
}