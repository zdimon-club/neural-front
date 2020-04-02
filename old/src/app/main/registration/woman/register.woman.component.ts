import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.woman.component.html',
  styleUrls: ['./register.woman.component.scss']
})

export class RegisterWomanComponent implements OnInit, OnDestroy {
  form: FormGroup;
  is_registered = false;
  email = '';

  form_data: any;
  oneFields: any;
  manyFields: any;
  images: any[] = [];

  private props: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private service: RegistrationService
  ) {
    this.service.getFormProps('female').subscribe((data: any) => {
      this.props = data;
      this.buildForm();
    });


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

    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+")){1,63}@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,3}))$'),
        Validators.email],
        this.service.validateEmailNotTaken.bind(this)
      ],
      name: ['', [Validators.required]],
      about_me: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      lookingfor: ['', [Validators.required]],
      job: ['', [Validators.required]],
      goal: ['', [Validators.required]],
      city: ['', [Validators.required]],
      photo: ['']
    });

  }

  buildForm() {
    for (const field in this.props.one) {
      if (this.props.one.hasOwnProperty(field)) {
        this.form.addControl(this.props.one[field].alias, new FormControl(''));
      }
    }
    for (const field in this.props.many) {
      if (this.props.many.hasOwnProperty(field)) {
        this.form.addControl(this.props.many[field].alias, this.buildMany(this.props.many[field].values));
      }
    }
    this.oneFields = this.props.one;
    this.manyFields = this.props.many;
    console.log(this.form.value);
  }

  buildMany(options: any) {
    const arr = options.map(item => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      this.service.getBase64(file).subscribe(data => {
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

  onSubmit() {
    this.is_registered = true;
    this.form_data = this.form.value;
    this.form_data.images = this.images;
    this.service.registerWoman(this.form_data).subscribe(data => {

    });
  }

  test() {
    this.is_registered = true;
  }

  testt() {
    this.is_registered = false;
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
