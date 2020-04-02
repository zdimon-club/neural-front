
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Message } from '../../store/chat.store';

@Component({
  selector: 'app-chat-message-item',
  templateUrl: './chat.message.item.component.html',
  styleUrls: ['./chat.message.item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatStageMessageItemComponent implements OnInit {

  @Input() message: Message;
  @Input() current_user = false;

  constructor() {}

   ngOnInit() {
     // console.log(this.message);
  }


}
