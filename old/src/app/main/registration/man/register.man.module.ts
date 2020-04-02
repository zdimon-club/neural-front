import { SharedModule } from './../../../shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RegisterManComponent } from './register.man.component';
import { RegistrationService } from '../registration.service';

const routes = [
  {
    path: '**',
    component: RegisterManComponent
  }
];

@NgModule({
  declarations: [
    RegisterManComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [RegistrationService]
})
export class RegisterManModule {
}
