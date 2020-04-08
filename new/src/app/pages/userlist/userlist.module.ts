
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlistComponent } from './userlist.component';
import { FilterComponent } from './filter/filter/filter.component';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../../shared.module';


import { OnlineSideComponent } from './../../core/online-side/online-side/online-side.component';
// children routs


const itemRoutes: Routes = [
  { path: '', component: UserlistComponent},
];


const routes: Routes = [

    { path: '', component: UserlistComponent, children: itemRoutes}

];


@NgModule({
  declarations: [
    UserlistComponent,
    FilterComponent,
    ListComponent,
    OnlineSideComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class UserlistModule { }
