// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionService } from './session.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private sessionService: SessionService
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {

            return this.sessionService.isLoggedIn.pipe(
                tap((val) => {
                    if (!val) {
                        this.router.navigateByUrl('/pages/auth/login');
                    }
                })
            );

    }
}
