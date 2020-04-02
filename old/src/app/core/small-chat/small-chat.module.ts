import { SnackbarComponent } from './../snackbar/snackbar.component';
import { SoundService } from './../services/sound.service';
import { OpenViduVideoComponent } from './cam/ov-video.component';
import { UserVideoComponent } from './cam/video.component';
import { AbonentVideoComponent } from './cam/abonent.video.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallChatComponent } from './small-chat.component';
import { SmallChatService } from './small-chat.service';
import { SharedModule } from '../../shared.module';
import { SocketService } from '../../socket/socket.service';
import { ChatService } from '../../main/chat/services/chat.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';



@NgModule({
  declarations: [
    SmallChatComponent,
    AbonentVideoComponent,
    UserVideoComponent,
    OpenViduVideoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSnackBarModule
  ],
  exports: [SmallChatComponent],
  providers: [SmallChatService, SocketService, ChatService, SoundService],
  entryComponents: [SnackbarComponent]
})
export class SmallChatModule {
}
