import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Inject,
  OnDestroy,
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  // Private
  private _unsubscribeAll: Subject<any>;

  displayedColumns = ['image_small', 'is_main', 'is_deleted', 'is_approved', 'actions'];

  payments: Observable<any>;
  currentPage = 1;
  pageType: string;

  constructor(private router: Router) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
