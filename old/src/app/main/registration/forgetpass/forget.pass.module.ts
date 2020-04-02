import { ForgetPassComponent } from './forget.pass.component';
import { SharedModule } from '../../../shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RegistrationService } from '../registration.service';

const routes = [
  {
    path: '**',
    component: ForgetPassComponent
  }
];

@NgModule({
  declarations: [
    ForgetPassComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [RegistrationService]
})
export class ForgetPassModule {
}
