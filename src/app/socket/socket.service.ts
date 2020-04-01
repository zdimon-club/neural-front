import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";

import { interval, timer, pipe } from 'rxjs';

import {filter} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import {isPlatformBrowser} from '@angular/common';
import { PLATFORM_ID } from '@angular/core';


@Injectable({
  providedIn: "root"
})
export class SocketService {
  private socket;
  isBrowser = false;
  /// Event observables

  chat$ = new ReplaySubject<Object>();
  notifications$ = new ReplaySubject<Object>();

  constructor(
    @Inject(PLATFORM_ID) protected _platformId: Object,

  ) {
    if(this.isBrowser) {
      this.connect();
    }
    const isBrowser = isPlatformBrowser(this._platformId);
  }

  connect() {
    this.socket = new WebSocket('ws://localhost:8000/chat/');
    this.dispacher();


    this.socket.onclose = (e) => {
        console.error('Chat socket closed unexpectedly');
        timer(1000).subscribe(() => {
          this.connect();
        })
    };

    this.socket.onopen = (e) => {
       console.log('Try connect!!!');

      //  const ping = interval(1000).subscribe((v) => {
      //    console.log(v);
      //   //  chatSocket.send(JSON.stringify({
      //   //   'message': 'hello'
      //   //   }));

      //  })
    
    };
  }

  sendMessage(message: any) {
    this.socket.send(JSON.stringify({ message: message }));
  }


  dispacher(): void {
    this.socket.onmessage = event => {
       const message = JSON.parse(event.data);
       console.log(message);
       if (message.message.action === 'chat') {
           this.chat$.next(message.message);
       }

       if (message.message.action === 'notify') {
        this.notifications$.next(message.message);
       }

    };
  }
  
}