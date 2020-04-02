import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypoComponent } from './typo.component';
import { SharedModule } from '../../shared.module';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    component: TypoComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TypoComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [TypoComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class TypoModule { }
