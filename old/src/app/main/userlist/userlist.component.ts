import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserlistService } from './userlist.service';

import { UserlistState } from './store/userlist.store';
import { UpdateUsers } from './store/userlist.action';
import { selectUserlist } from './store/userlist.select';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any>;

  public userlist: any;

  constructor(
    private userlist_service: UserlistService,
    private userlist_store: Store<UserlistState>,
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.userlist_service.getList().subscribe((res: any) => {
      console.log(res.results_list);
      this.userlist_store.dispatch(new UpdateUsers(res.results_list));
      this.userlist_store
        .select(selectUserlist)
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((value) => {
          this.userlist = value;
        });
    });
  }

  trigger(user) {
    user.is_online = !user.is_online;
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
