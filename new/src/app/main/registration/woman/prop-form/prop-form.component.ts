
import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map, mergeMap} from 'rxjs/operators';

import { PersonalInfoService } from './../../../../core/services/personal-info.service';
import { IProps } from './../../../../core/interfaces/IProps';

@Component({
  selector: 'app-main-registration-woman-prop-form',
  templateUrl: './prop-form.component.html',
  styleUrls: ['./prop-form.component.scss']
})
export class PropFormComponent implements OnInit {
  private personalInfo;
  personalFormInfo: FormGroup;
  personalArr: IProps[] = [];
  bodyArr: IProps[] = [];
  hobbyArr: IProps[] = [];
  interestArr: IProps[] = [];
  contactArr: IProps[] = [];
  valuePers: string;
  valueBody: string;
  valueHobby: string;
  valueInt: string;
  valueCont: string;
  constructor(
    private propsService: PersonalInfoService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit( ): void {
    this.initForm();
    this.getEditFields();
  }
  get f() { return this.personalFormInfo.controls; }
  get p() { return this.f.personal as FormArray; }
  get b() { return this.f.body as FormArray; }
  get h() { return this.f.hobby as FormArray; }
  get i() { return this.f.interest as FormArray; }
  get c() { return this.f.contact as FormArray; }

  initForm() {
    this.personalFormInfo = this.formBuilder.group({
        personal:  new FormArray([]),
        body:  new FormArray([]),
        hobby:  new FormArray([]),
        interest:  new FormArray([]),
        contact:  new FormArray([]),
    });
  }


   getEditFields() {
    this.propsService.getProp('female').pipe(
      map(item => item),
      mergeMap(item => item)
    ).subscribe(res => {
      if (res.category === 'personal') {
        this.personalArr.push(res);
        this.p.push(this.formBuilder.group({
          [res.alias]: ['', Validators.required],
          prop_id: [res.id, Validators.required],
        }));
      } else if (res.category === 'body') {
        this.bodyArr.push(res);
        this.b.push(this.formBuilder.group({
          [res.alias]: ['', Validators.required],
          prop_id: [res.id, Validators.required],
        }));
      }  else if (res.category === 'hobby') {
        this.hobbyArr.push(res);
        this.h.push(this.formBuilder.group({
          [res.alias]: ['', Validators.required],
          prop_id: [res.id, Validators.required],
        }));
      }  else if (res.category === 'interest') {
        this.interestArr.push(res);
        this.i.push(this.formBuilder.group({
          [res.alias]: ['', Validators.required],
          prop_id: [res.id, Validators.required],
        }));
      }  else if (res.category === 'contact') {
        this.contactArr.push(res);
        this.c.push(this.formBuilder.group({
          [res.alias]: ['', Validators.required],
          prop_id: [res.id, Validators.required],
        }));
      }
    },
    error => {console.log(error); });
  }


  sendFormValue(control) {
    console.log(control);
    if (control.valid) {
     this.propsService.saveProp(control.value).subscribe( res => {
     },
     err => {
      console.log(err);
    });
    }
  }
}
