import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RegisterAgencyComponent } from './register.agency.component';
import { RegistrationService } from '../registration.service';
import { SharedModule } from '../../../shared.module';

const routes = [
  {
    path: '**',
    component: RegisterAgencyComponent
  }
];

@NgModule({
  declarations: [
    RegisterAgencyComponent
  ],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    SharedModule
  ],
  providers: [RegistrationService]
})
export class RegisterAgencyModule {
}
