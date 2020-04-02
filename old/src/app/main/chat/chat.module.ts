import { ClickOutsideModule } from 'ng-click-outside';
import { OpenViduVideoComponent } from './components/media/ov-video.component';
import { AbonentVideoComponent } from './components/video/abonent.video.component';
import { UserVideoComponent } from './components/media/video.component';
import { PhotoPopupComponent } from './components/popup/photo.component';
import { VideoPopupComponent } from './components/popup/video.component';

// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { ChatStageRoutingModule } from './chat.routing.module';
// services
// import { OnlineService } from '../store/online/online.service';
// import { WebRtcService } from './services/webrts.service';
import { ChatService } from './services/chat.service';


/// components

import { BaseChatStageComponent } from './components/base/base.chat.component';
import { RoomChatComponent } from './components/room/room.chat.component';
import { OwnerVideoComponent } from './components/video/owner.video.component';
import { ChatContactComponent } from './components/contact/chat.contact.component';

import { RouterModule, Routes } from '@angular/router';


import { ChatStageOnlineComponent } from './components/online/chat.online.component';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';


// pipes

import { ArraySortPipe } from './pipes/sortby.pipe';
import { ParseSmilePipe } from './pipes/smile.parser.pipe';

import {OwnerVideoService} from './services/owner.video.service';
import {AbonentVideoService} from './services/abonent.video.service';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormatVideoCounterPipe } from './pipes/format-video-counter.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {SmilesComponent} from './components/smiles/smiles.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


export const chatRoutes: Routes = [

  { path: 'room/:id', component: BaseChatStageComponent},
  { path: '', redirectTo: 'index', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    ParseSmilePipe,
    ArraySortPipe,
    ChatContactComponent,
    OwnerVideoComponent,
    BaseChatStageComponent,
    RoomChatComponent,
    VideoPopupComponent,
    PhotoPopupComponent,
    UserVideoComponent,
    AbonentVideoComponent,
    OpenViduVideoComponent,
    ChatStageOnlineComponent,
    FormatVideoCounterPipe,
    SmilesComponent
  ],
  imports: [
    ClickOutsideModule,
    PerfectScrollbarModule,
    CommonModule,
    FormsModule,
    ChatStageRoutingModule,
    SharedModule,
    RouterModule.forChild(chatRoutes),

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    DragDropModule,
  ],
  exports: [],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    // WebRtcService,
    ChatService,
    OwnerVideoService,
    AbonentVideoService
  ],
  entryComponents: [
    VideoPopupComponent,
    PhotoPopupComponent,
    SmilesComponent]
})
export class ChatModule { }
