import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket/socket.service';

@Component({
  selector: 'app-typo',
  templateUrl: './typo.component.html',
  styleUrls: ['./typo.component.scss']
})
export class TypoComponent implements OnInit {


  message = "";
  messages = [];

  constructor(private socketService: SocketService) { }

  ngOnInit() {
  }

  sendChat() {
    this.socketService.sendMessage({
      action: 'broadcast',
      data: this.message
    });
  }

}
