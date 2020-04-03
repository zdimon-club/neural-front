/* author Dimitry Zharikov zdimon77@gmail.com */

import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {SessionService} from '../../auth/session.service';
import { HttpHeaders } from '@angular/common/http';
/*
  Add token and language to any HTTP request.
*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    token: string;
    language = 'en';

    constructor(
        private sessionService: SessionService
    ) {
    }

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = this.sessionService.getToken();

        if (req.headers.get('Authorization') !== null) {
            return next.handle(req.clone());
        }
        
        if (this.sessionService.getLanguage() === null) {
           this.sessionService.setLanguage('en');
         }


        const language = this.sessionService.getLanguage();


        if (idToken) {

            const cloned = req.clone({
                headers: req.headers.set('Authorization',
                    'Token ' + idToken)
                    .set('Accept-Language', language)
            });

            return next.handle(cloned);
        } else {
            const cloned = req.clone({
                headers: req.headers.set('Accept-Language', language)
            });
            return next.handle(cloned);
        }
    }
}
