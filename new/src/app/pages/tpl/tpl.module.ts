import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TplComponent } from './tpl.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    component: TplComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TplComponent,
      },
    ],
  },
];


@NgModule({
  declarations: [TplComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TplModule { }
