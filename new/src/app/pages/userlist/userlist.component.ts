

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

// store
import { Store } from '@ngrx/store';
import { UserlistState } from './../../main/userlist/store/userlist.store';
import { RequestUserlist } from './../../main/userlist/store/userlist.action';
import { selectUserlistArray } from './../../main/userlist/store/userlist.selector';
import { User } from './../../main/users/store/users.store';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  users: Observable<any>;

  constructor(
    private userlistStore: Store<UserlistState>
  ) {
      this.userlistStore.dispatch(new RequestUserlist(1));
   }

  ngOnInit() {
      this.users = this.userlistStore.select(selectUserlistArray);
  }

}
