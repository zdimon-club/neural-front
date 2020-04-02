import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from '../../../registration/registration.service';
import { ProfileService } from '../../profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agency-form',
  templateUrl: './agency-form.component.html',
  styleUrls: ['./agency-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgencyFormComponent implements OnInit {
  public registerForm: FormGroup;
  public email = '';
  public images: any[] = [];
  private form_data: any;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private registrationService: RegistrationService,
    private profileService: ProfileService
  ) {
  }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email],
        this.registrationService.validateEmailNotTaken.bind(this)],
      name: ['', [Validators.required]],
      name_boss: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      skype: [''],
      phone1: [''],
      phone2: [''],
      photo: [''],
      count_woman: [''],
      working_time: ['']
    });
  }

  public onFileChange(event): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      this.registrationService.getBase64(file).subscribe(data => {
        this.images.push(data);
      });

    }
  }

  public deleteImg(index: number): void {
    if (index > -1) {
      this.images.splice(index, 1);
    }
  }

  public onSubmit(): Subscription {
    this.form_data = this.registerForm.value;
    this.form_data.images = this.images;
    return this.profileService.editProfile(this.form_data).subscribe((res) => {
      console.log('profile changed successfully');
    }, (err) => {
      console.log(err);
    });
  }

}
