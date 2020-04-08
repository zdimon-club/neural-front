import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivChatComponent } from './priv-chat.component';
import { SharedModule } from '../../shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { IndexComponent } from './index/index.component';
import { OnlineItemComponent } from './online-item/online-item.component';
import { ContactItemComponent } from './contact-item/contact-item.component';


// child routes

const itemRoutes: Routes = [
  { path: 'room:room_id', component: RoomComponent },
  { path: 'index', component: IndexComponent},
  { path: '', component: IndexComponent},
];

const routes: Routes = [
  {
    path: '',
    component: PrivChatComponent,
    children: itemRoutes
  },


];


@NgModule({
  declarations: [PrivChatComponent, RoomComponent, IndexComponent, OnlineItemComponent, ContactItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class PrivChatModule { }
