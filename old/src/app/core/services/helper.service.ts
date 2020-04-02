import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
  public throttle(func, time) {
    return function(args) {
      const previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (previousCall === undefined || this.lastCall - previousCall > time) {
        func(args);
      }
    };
  }
}
