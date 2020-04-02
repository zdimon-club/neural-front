import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivChatComponent } from './priv-chat.component';
import { SharedModule } from '../../shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PrivChatComponent
  }
];


@NgModule({
  declarations: [PrivChatComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class PrivChatModule { }
