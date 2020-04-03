/* author Dmitry Zharikov zdimon77@gmail.com */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Session store
import { Store } from '@ngrx/store';
import { SessionState } from '../auth/store/session.store';
import { selectIsAuth } from './../auth/store/session.selector';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  private isAuth: Observable<any>;


  constructor(
    private sessionStore: Store<SessionState>,
  ) {
    this.isAuth = this.sessionStore.select(selectIsAuth);
   }

  ngOnInit() {
  }

}
