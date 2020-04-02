
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-chat-contact',
  templateUrl: './chat.contact.component.html',
  styleUrls: ['./chat.contact.component.scss'],
})
export class ChatContactComponent implements OnInit {

  @Input() contacts: any;
  @Output() select_emmiter = new EventEmitter();

  constructor() {}

   ngOnInit() {


  }



}
