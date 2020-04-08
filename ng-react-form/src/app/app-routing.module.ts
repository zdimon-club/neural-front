import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PersonalInfoComponent} from './components/personal-info/personal-info.component';


const routes: Routes = [{
  path: '', component: PersonalInfoComponent, children: [

  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
