
/* author Dmitry Zharikov zdimon77@gmail.com */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Session store
import { Store } from '@ngrx/store';
import { SessionState } from '../auth/store/session.store';
import { selectIsAuth, selectUser } from './../auth/store/session.selector';

import { User } from './../main/users/store/users.store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public isAuth: Observable<any>;
  public user: Observable<User>;


  constructor(
    private sessionStore: Store<SessionState>,
  ) {
    this.isAuth = this.sessionStore.select(selectIsAuth);
    this.user = this.sessionStore.select(selectUser);
   }

  ngOnInit() {
  }

}
