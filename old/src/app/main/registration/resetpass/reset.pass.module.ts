
import { SharedModule } from './../../../shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


import { ResetPassComponent } from './reset.pass.component';

const routes = [
  {
    path: '**',
    component: ResetPassComponent
  }
];

@NgModule({
  declarations: [
    ResetPassComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: []
})
export class ResetPassModule {
}
