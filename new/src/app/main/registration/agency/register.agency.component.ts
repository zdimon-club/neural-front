import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { debounceTime, map } from 'rxjs/operators';
import { RegistrationService } from '../../../core/services/registration.service';


@Component({
    selector     : 'app-main-registration-agency',
    templateUrl  : './register.agency.component.html',
    styleUrls    : ['./register.agency.component.scss']
})
export class RegisterAgencyComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    is_registered = false;
    email = '';
    public images: any[] = [];
    form_data: any;
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _formBuilder: FormBuilder,
        private http: HttpClient,
        private registrationService: RegistrationService
    ) {


        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {

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
        const data = {email: this.registerForm.get('email').value};
        this.is_registered = true;
        this.form_data = this.registerForm.value;
        this.form_data.images = this.images;
        return this.registrationService.registerAgency(this.form_data).subscribe(
            (rez) => {
              // console.log(rez);

              this.email = this.registerForm.get('email').value;
            }
          );
      }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
