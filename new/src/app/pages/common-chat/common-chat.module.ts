import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonChatComponent } from './common-chat.component';
import { LeftSideComponent } from './left-side/left-side.component';
import { RoomComponent } from './room/room.component';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';


// child routs
const childRoutes: Routes = [
  { path: 'room/:room_id', component: RoomComponent},
  { path: '', component: IndexComponent},
];


const routes: Routes = [

    { path: '', component: CommonChatComponent, children: childRoutes}

];

@NgModule({
  declarations: [CommonChatComponent, LeftSideComponent, RoomComponent, IndexComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CommonChatModule { }
