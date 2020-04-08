import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from './../../../main/users/store/users.store';


@Component({
  selector: 'app-layout-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  @Input() user: User;
  @Output() logoutEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
