import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    component: LoginComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
      },
    ],
  },
];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class LoginModule { }
