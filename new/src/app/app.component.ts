
import { Component } from '@angular/core';
import { SocketService } from './socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  message = 'ssssssss';
  messages = [];

 constructor(private socketService: SocketService) {

  this.socketService.chat$.subscribe((v) => {
    // console.log(v);
    this.messages.push(v);
  });

  this.socketService.notifications$.subscribe((v) => {
    // console.log(v);
  });

 }

   



   sendBroad() {
    this.socketService.sendMessage({
      action: 'broadcast',
      data: this.message
    });
  }


   sendNotify() {
    this.socketService.sendMessage({
      action: 'notify',
      data: 'Warrning!!!!'
    });
  }


}
