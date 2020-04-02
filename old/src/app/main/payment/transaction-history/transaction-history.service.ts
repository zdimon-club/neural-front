import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TransactionHistoryService {
  constructor(private http: HttpClient) {}

  public getPaymentHistory() {
    return this.http.get(`${environment.apiUrl}/payment/user/list`);
  }
}
