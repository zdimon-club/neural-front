import { RegistrationService } from './../registration/registration.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../auth/login.service';
import { ConfirmComponent, IConfirmationModalBody } from '../../modal/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { error } from 'util';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, DoCheck {
  loginForm: FormGroup;

  public tempUsers = {
    men: [],
    women: [],
  };
  public allUsers: any;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private registrationService: RegistrationService,
    private authService: AuthService,
    private matDialog: MatDialog,
  ) {

    // users TODO: for testing
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

  }

  ngOnInit(): void {
    this.initForm();
    this.loginService.login$.subscribe((errorData: { status: number, title: string, message: string }) => {
      console.log('mark', errorData);

      const data: IConfirmationModalBody = {
        title: errorData.title,
        type: 'warning',
        content: errorData.message,
        buttons: [
          { title: 'cancel', action: 'reject', type: 'outline' },
          { title: 'SUPPORT', link: '/', action: 'navigate', type: 'default' },
        ],
      };

      this.matDialog.open(ConfirmComponent, { data, panelClass: 'confirm-dialog' });
    });

    /*this.authService.authState.subscribe((user) => {
      this.loginService.loginGoogle(user);
    });*/
  }

  ngDoCheck(): void {
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['',
        [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.email],
        [this.registrationService.validateEmailTaken.bind(this)]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loginService.login(this.loginForm.value);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(res => {
        this.authService.authState.subscribe(user => {
          this.loginService.loginGoogle(user);
        });
      });

  }

  public loginAs(user) {
    this.loginService.login(user);
  }
}
