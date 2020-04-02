import { element } from 'protractor';
import { RegistrationService } from './../../registration/registration.service';
import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileService } from './../profile.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailFormComponent implements OnInit {

  @Input() user;
  @Output() saved = new EventEmitter();
  form: FormGroup;
  form_data: any;
  user_data = {};
  oneFields: any;
  manyFields: any;
  private props: any;


  constructor(
    private profile_service: ProfileService,
    private fb: FormBuilder,
    private registration_service: RegistrationService,
  ) {

    this.registration_service.getFormProps('female').subscribe((data: any) => {
      this.props = data;
      this.buildForm();
      this.fillForm();
    });

  }

  ngOnInit() {
    this.form = this.fb.group({
      job: [''],
      goal: [''],
    });

    this.form.valueChanges
      .subscribe(v => {
        console.log('mark', v);
      });
  }

  buildForm() {

    for (let field in this.props.one) {
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
  }

  private fillForm() {
    // this.user_data['job'] = 'sssss';
    // this.user_data['goal'] = 'sssss';

    var arrayLength = this.user.props.length;
    for (var i = 0; i < arrayLength; i++) {
      let it = {};
      it[this.user.props[i].alias] = this.user.props[i].id;
      this.user_data[this.user.props[i].alias] = this.user.props[i].id;
      try {
        this.form.patchValue(it);
      } catch (error) {

      }
    }
    this.form.patchValue({ goal: this.user.user.goal });
    this.form.patchValue({ job: this.user.user.job });


  }

  buildMany(options: any) {
    const arr = options.map(item => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }

  onSubmit() {

    this.form_data = this.form.value;
    this.profile_service.saveDetail(this.form_data).subscribe(data => {
      this.saved.emit(data);
    });
  }

}
