import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from '../../../registration/registration.service';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-man-form',
  templateUrl: './man-form.component.html',
  styleUrls: ['./man-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ManFormComponent implements OnInit {
  public registerForm: FormGroup;
  public email = '';

  constructor(private _formBuilder: FormBuilder,
              private http: HttpClient,
              private registrationService: RegistrationService,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    {
      this.registerForm = this._formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.email
        ],
          this.registrationService.validateEmailNotTaken.bind(this)
        ]
      });
    }
  }

  public onSubmit() {
    const data = this.registerForm.value;
    return this.profileService.editProfile(data);
  }

}
