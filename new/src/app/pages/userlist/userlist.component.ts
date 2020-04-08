


import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

// store
import { Store } from '@ngrx/store';
import { UserlistState } from './../../main/userlist/store/userlist.store';
import { RequestUserlist } from './../../main/userlist/store/userlist.action';
import { selectUserlistArray } from './../../main/userlist/store/userlist.selector';
import { User, UserState } from './../../main/users/store/users.store';

import { selectUserOnlineArray } from './../../main/users/store/usersonline.selector';
import { UsersOnlineState } from './../../main/users/store/usersonline.store';
import { RequestUsersOnline } from './../../main/users/store/usersonline.action';


import { selectUsersOnlineObjsList } from './../../main/users/store/users.selector';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  users: Observable<any>;
  users_online: Observable<any>;

  constructor(
    private userlistStore: Store<UserlistState>,
    private uoStore: Store<UsersOnlineState>,
    private userState: Store<UserState>
  ) {
      this.userlistStore.dispatch(new RequestUserlist(1));
      // this.uoStore.dispatch(new RequestUsersOnline(1));
   }

  ngOnInit() {
      this.users = this.userlistStore.select(selectUserlistArray);
      this.users_online = this.userState.select(selectUsersOnlineObjsList);
  }

}
