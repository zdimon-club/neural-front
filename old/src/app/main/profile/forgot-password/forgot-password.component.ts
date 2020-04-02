import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../profile.service';
import { PasswordValidation } from './password-validation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public resetForm: FormGroup;

  constructor(private fb: FormBuilder,
              private profileService: ProfileService,
              private _matSnackBar: MatSnackBar,
              private dialogRef: MatDialogRef<ForgotPasswordComponent>, ) {
    this.resetForm = fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }

  ngOnInit() {
  }
  // todo add oldPassword validator

  public onSubmit() {
    const newPassword = this.resetForm.get('password').value;
    const data = {
      // old: this.resetForm.get('password').value,
      new: this.resetForm.get('password').value
    };
    this.profileService.resetPassword(data).subscribe( res => {
      this.dialogRef.close();
      this._matSnackBar.open(res.message, 'OK', {
        verticalPosition: 'top',
        duration        : 2000
      });
    });
  }
}
