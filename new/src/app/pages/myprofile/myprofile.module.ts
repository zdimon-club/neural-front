

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyprofileComponent } from './myprofile.component';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module'
import { InfoComponent } from './info/info.component';
import { EditComponent } from './edit/edit.component';
import { PostComponent } from './post/post.component';

// определение дочерних маршрутов
const itemRoutes: Routes = [
  { path: 'info', component: InfoComponent},
  { path: 'edit', component: EditComponent},
  { path: 'post', component: PostComponent},
  { path: '', component: InfoComponent},
];


const routes: Routes = [
  
    { path: '', component: MyprofileComponent, children: itemRoutes}

];

@NgModule({
  declarations: [
    MyprofileComponent,
    InfoComponent,
    EditComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class MyprofileModule { }
