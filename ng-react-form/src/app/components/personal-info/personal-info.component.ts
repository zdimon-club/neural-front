import { Component, OnInit } from '@angular/core';
import {PersonalInfoService} from '../../services/personal-info.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryDto} from '../../DataDTO/CategoryDto';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  private personalInfo;
  personalFormInfo: FormGroup;
  personalArr: CategoryDto[] = [];
  bodyArr: CategoryDto[] = [];
  hobbyArr: CategoryDto[] = [];
  interestArr: CategoryDto[] = [];
  contactArr: CategoryDto[] = [];
  valuePers: string;
  valueBody: string;
  valueHobby: string;
  valueInt: string;
  valueCont: string;
  constructor(
    private personalInfoService: PersonalInfoService,
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
    this.personalInfoService.GetPersonalInfo().pipe(
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
     this.personalInfoService.SavePersonalData(control.value).subscribe( res => {
     },
     err => {
      console.log(err);
    });
    }
  }
}
