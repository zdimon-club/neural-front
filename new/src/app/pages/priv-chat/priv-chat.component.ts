import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { User, UserState } from './../../main/users/store/users.store';

import { selectUsersOnlineObjsList } from './../../main/users/store/users.selector';


@Component({
  selector: 'app-priv-chat',
  templateUrl: './priv-chat.component.html',
  styleUrls: ['./priv-chat.component.scss']
})
export class PrivChatComponent implements OnInit {

  usersOnline: Observable<User[]>;
  constructor(
    private _userStore: Store<UserState>,
  ) {

    this.usersOnline = this._userStore.select(selectUsersOnlineObjsList);
  }

  ngOnInit() {
  }

}
