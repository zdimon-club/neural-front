import { Component, OnInit, Input } from '@angular/core';
import { User } from './../../../main/users/store/users.store';


@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
