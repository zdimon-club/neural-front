import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectModalData } from './store/modal.selector';
import { filter } from 'rxjs/operators';
import { ConfirmComponent } from './confirm/confirm.component';
import { ModalState } from './store/modal.store';
import { MatDialog } from '@angular/material/dialog';
import { CloseModal } from './store/modal.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  template: '',
})
export class ModalComponent implements OnInit, OnDestroy {
  @Output() modalEvent = new EventEmitter<string>();
  private storeSubscription: Subscription;

  constructor(
    private modalStore$: Store<ModalState>,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.storeSubscription = this.modalStore$.pipe(select(selectModalData))
      .pipe(
        filter((data => !!data),
        ))
      .subscribe(data => {
        this.matDialog.open(ConfirmComponent, { data, panelClass: 'confirm-dialog' })
          .afterClosed().subscribe(e => {
          this.modalEvent.emit(e);
          this.modalStore$.dispatch(new CloseModal());
        });
      });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
