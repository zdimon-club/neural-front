import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ProfileService } from '../../profile.service';
import { RegistrationService } from '../../../registration/registration.service';

@Component({
  selector: 'app-woman-form',
  templateUrl: './woman-form.component.html',
  styleUrls: ['./woman-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WomanFormComponent implements OnInit {
  public form: FormGroup;
  public email = '';

  form_data: any;
  oneFields: any;
  images: any[] = [];

  // private _unsubscribeAll: Subject<any>;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private service: ProfileService,
              private registrationServie: RegistrationService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email],
        this.registrationServie.validateEmailNotTaken.bind(this)
      ],
      name: ['', [Validators.required]],
      about_me: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      lookingfor: ['', [Validators.required]],
      job: ['', [Validators.required]],
      goal: ['', [Validators.required]],
      city: ['', [Validators.required]],
      photo: [''],
      alkohol: [''],
      children: [''],
      constitution: [''],
      eye_color: [''],
      hair_color: [''],
      height: [''],
      hobby: [''],
      language: [null],
      marital: [''],
      race: [''],
      religion: [''],
      smoking: [''],
      weight: [''],
    });
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      this.registrationServie.getBase64(file).subscribe(data => {
        // console.log(data);
        this.images.push(data);
      });


    }
  }

  deleteImg(index: number) {
    if (index > -1) {
      this.images.splice(index, 1);
    }
  }

  public onSubmit() {
    this.form_data = this.form.value;
    this.form_data.images = this.images;
    this.service.editProfile(this.form_data).subscribe(data => {

    });
  }

  // ngOnDestroy(): void {
  //   this._unsubscribeAll.next();
  //   this._unsubscribeAll.complete();
  // }

}
