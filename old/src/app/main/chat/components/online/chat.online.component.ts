
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chat-online',
  templateUrl: './chat.online.component.html',
  styleUrls: ['./chat.online.component.scss']
})
export class ChatStageOnlineComponent implements OnInit {

  @Input() online: any;
  @Output() select_emmiter = new EventEmitter();

  constructor() {}

   ngOnInit() {

  }



}
