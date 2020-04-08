
import { Component, OnInit, Input } from '@angular/core';

import { User } from './../../../main/users/store/users.store';

@Component({
  selector: 'app-priv-chat-online-item',
  templateUrl: './online-item.component.html',
  styleUrls: ['./online-item.component.scss']
})
export class OnlineItemComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
