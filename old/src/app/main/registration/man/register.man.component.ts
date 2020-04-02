import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { RegistrationService } from '../registration.service';
import { Store } from '@ngrx/store';
import * as sessionActions from '../../../auth/store/session.action';
import {SessionService} from '../../../auth/session.service';
import {Router} from '@angular/router';
import { SessionState } from '../../../auth/store/session.store';
import { LoginService } from '../../../auth/login.service';

@Component({
    selector     : 'app-register',
    templateUrl  : './register.man.component.html',
    styleUrls    : ['./register.man.component.scss']
})
export class RegisterManComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    is_registered = false;
    email = '';

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _formBuilder: FormBuilder,
        private http: HttpClient,
        private registrationService: RegistrationService,
        private session_service: SessionService,
        private router: Router,
        private session_store: Store<SessionState>,
        private _loginService: LoginService,

    ) {

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
      this.registerForm = this._formBuilder.group({
        email: ['', [
          Validators.required,
          // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
          Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+")){1,63}@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,3}))$'),
          Validators.email,
        ],
          this.registrationService.validateEmailNotTaken.bind(this),
        ],
        password: [''],
      });
    }

      onSubmit() {
        const data = {email: this.registerForm.get('email').value};
        return this.http
          .post(`${environment.apiUrl}/register/man`, data).subscribe(
            (rez: any) => {

              this.session_service.setToken(rez.token);
              this.session_service.setLanguage(rez.language);
              this.session_store.dispatch(new sessionActions.LogIn(rez));
              this.router.navigate(['profile/' + rez.user.id]);
              this.is_registered = true;
              this.email = this.registerForm.get('email').value;
            }
          );
      }
    /**
     * On destroy
     */

    login(){
      let data = {
        username: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value
      }

      this._loginService.login(data);
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
