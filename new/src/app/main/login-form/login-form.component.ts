/* author Dimitry Zharikov zdimon77@gmail.com */

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { LoginService } from '../../auth/login.service';

@Component({
  selector: 'app-main-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  manForm: FormGroup;
  womanForm: FormGroup;

  constructor(
    private loginService: LoginService,
    fb: FormBuilder
    ) {
    this.loginForm = fb.group({
      username:  new FormControl(''),
      password: new FormControl(''),
    });

    this.manForm = fb.group({
      username:  new FormControl(''),
      password: new FormControl(''),
    });

    this.womanForm = fb.group({
      username:  new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.login(this.loginForm.value);
  }


}

