import { Component, OnInit } from '@angular/core';
import { TransactionHistoryService } from './transaction-history.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit {

  data: any = [];
  constructor(private transaction_history_service: TransactionHistoryService) {
  }
  transactionHistoryList: any;

  ngOnInit() {
    this.transactionHistoryList = this.transaction_history_service
      .getPaymentHistory()
      .subscribe((data: any) => {
        this.data = data.results_list;
        console.log(this.data);
      });
  }
}
