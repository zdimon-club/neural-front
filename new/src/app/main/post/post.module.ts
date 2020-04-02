
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { SharedModule } from '../../shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    component: PostComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PostComponent,
      },
    ],
  },
];


@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class PostModule { }
