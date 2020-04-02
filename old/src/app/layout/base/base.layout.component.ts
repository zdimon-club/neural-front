import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
// store
import { Store } from '@ngrx/store';
import { SessionState } from '../../auth/store/session.store';
import { selectUi } from '../../auth/store/session.selector';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

// import { navigation } from 'app/navigation/navigation';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base.layout.component.html',
  styleUrls: ['./base.layout.component.scss'],
})
export class BaseLayoutComponent implements OnInit, OnDestroy {
  // Private
  private unsubscribeAll: Subject<any>;
  public ui: Observable<any>;

  /**
   * Constructor
   *
   *
   */
  constructor(private sessionStore: Store<SessionState>) {
    this.ui = this.sessionStore.select(selectUi);
    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {}

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
