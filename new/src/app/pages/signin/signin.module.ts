
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin.component';
import { SharedModule } from '../../shared.module';

import { ManRegComponent } from './../../main/registration/man/man-reg.component';
import { WomanRegComponent } from './../../main/registration/woman/woman-reg/woman-reg.component';
import { RegisterAgencyComponent } from './../../main/registration/agency/register.agency.component';

/// props
import { PersonalInfoService } from './../../core/services/personal-info.service';
import { PropFormComponent } from './../../main/registration/woman/prop-form/prop-form.component';

import { RegistrationService } from './../../core/services/registration.service';

import { LoginFormComponent } from './../../main/login-form/login-form.component';

// child routes

const itemRoutes: Routes = [
  { path: 'login', component: LoginFormComponent},
  { path: 'woman', component: PropFormComponent},
  { path: 'man', component: ManRegComponent},
  { path: 'agency', component: RegisterAgencyComponent},
  { path: '', component: LoginFormComponent},
];


const routes: Routes = [

    { path: '', component: SigninComponent, children: itemRoutes}

];


@NgModule({
  declarations: [
    SigninComponent,
    WomanRegComponent,
    ManRegComponent,
    RegisterAgencyComponent,
    PropFormComponent,
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    RegistrationService,
    PersonalInfoService
  ]
})
export class SigninModule { }
