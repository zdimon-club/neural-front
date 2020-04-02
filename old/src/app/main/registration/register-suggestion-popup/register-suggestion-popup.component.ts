import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegistrationState } from '../store/registration.store';
import { Store, select } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';
import {
  selectIsSuggestionPopupOpened,
  selectIsSuggestionPopupMobile,
} from '../store/registration.select';
import * as registrationActions from '../../registration/store/registration.action';
import { SessionState } from '../../../auth/store/session.store';
import { selectIsAuth } from '../../../auth/store/session.selector';
import { RegisterPhotoVideoFormComponent } from './../photo-video-form/photo-video-form.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { LoginService } from '../../../auth/login.service';
import { timingSafeEqual } from 'crypto';
import { ToggleSuggestionPopup } from '../../registration/store/registration.action';

@Component({
  selector: 'app-register-suggestion-popup',
  templateUrl: './register-suggestion-popup.component.html',
  styleUrls: ['./register-suggestion-popup.component.scss'],
})
export class RegisterSuggestionPopupComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any>;
  isOpened = false;
  isMobile = false;
  isAuth: boolean;
  form: FormGroup;
  error_login_message: string;
  public tempUsers = {
    men: [],
    women: [],
  };
  public allUsers: any;

  constructor(
    private registration_store: Store<RegistrationState>,
    private sessionStore: Store<SessionState>,
    public dialog: MatDialog,
    private registrationService: RegistrationService,
    private _formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
  ) {

    for (let i = 1; i <= 19; i++) {
      const man = {
        name: `Man${i}`,
        value: { username: `man${i}@gmail.com`, password: `man${i}` },
      };
      const woman = {
        name: `Woman${i}`,
        value: { username: `woman${i}@gmail.com`, password: `woman${i}` },
      };
      this.tempUsers.men.push(man);
      this.tempUsers.women.push(woman);
    }
    this.allUsers = this.tempUsers;


    this.unsubscribeAll = new Subject();
    this.registration_store
      .select(selectIsSuggestionPopupOpened)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((value) => {
        this.isOpened = value;
      });

    this.registration_store
      .select(selectIsSuggestionPopupMobile)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((value) => {
        this.isMobile = value;
      });

    this.sessionStore.select(selectIsAuth)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((value) => {
        this.isAuth = value;
      });

    this.checkIsMobile();
    window.addEventListener('resize', () => this.checkIsMobile());
    this.buildForm();
    this.loginService.login_error_emmiter.subscribe((message: any) => {
      //this.form.get(email).invalid = true;
      this.form.controls['email'].setErrors({ 'incorrect': true });
    });
  }

  ngOnInit(): void {
    const f = () => {
      if (!this.isAuth) {
        this.registration_store.dispatch(new ToggleSuggestionPopup({ is_opened: true }));
      }
    };
    this.openAfter(f);
  }

  email = '';

  buildForm() {
    this.form = this._formBuilder.group({
      email: ['', [
        Validators.required,
        // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
        Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+")){1,63}@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,6}))$'),
        Validators.email,
      ],
        this.registrationService.validateEmailNotTaken.bind(this),
      ],
      password: [''],
    });
  }

  handleSubmitLogin(evt: any) {
    // console.log(this.form.get('email').value);
    // console.log(this.form.get('password').value);
    const data = {
      username: this.form.get('email').value,
      password: this.form.get('password').value,
    };

    this.loginService.login(data);
  }

  handleClosePopup() {
    this.registration_store.dispatch(
      new registrationActions.ToggleSuggestionPopup({ is_opened: false }),
    );
  }

  handleClickGender(gender) {
    this.registration_store.dispatch(
      new registrationActions.SetEmail({ email: this.form.get('email').value }),
    );
    this.registration_store.dispatch(new registrationActions.SetGender({ gender }));
    const dialogRef = this.dialog.open(RegisterPhotoVideoFormComponent, {
      height: '400px',
      width: '650px',
    });
  }

  checkIsMobile() {
    if (window.matchMedia('(max-width: 1020px)').matches) {
      this.registration_store.dispatch(
        new registrationActions.ToggleSuggestionPopupMobile({ is_mobile: true }),
      );
    } else {
      this.registration_store.dispatch(
        new registrationActions.ToggleSuggestionPopupMobile({ is_mobile: false }),
      );
    }
  }

  handleSubmitGoogleLogin(form): void {
    //console.log(form);
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(res => {
        this.authService.authState.subscribe(user => {
          this.loginService.loginGoogle(user);
        });
      });

  }

  public handleSubmitLoginAs(user) {
    this.loginService.login(user);
  }


  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private openAfter(openModal) {
    const t = timer(120000)
      .subscribe(() => {
        t.unsubscribe();
        openModal();
      });
  }
}
