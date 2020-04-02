
import { SocketService } from './../../socket/socket.service';

import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injector } from '@angular/core';
import {environment} from '../../../environments/environment';
import { BillingPopupComponent } from './billing.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable()
export class BillingService {

  constructor(
    private http: HttpClient,
    public injector: Injector,
    public socket_service: SocketService,
    private dialog: MatDialog,
  ) {

    this.socket_service.show_billing_dialog$.subscribe(data => {
      this.showDialog();
    });

  }

  public showDialog(){

    this.getPlans().subscribe(data => {
      this.dialog.open(BillingPopupComponent, {
        width: '600px',
        data: { data: data },
      });
    });

  }

  public getPlans() {
    return this.http.get(`${environment.apiUrl}/settings/plan`)
  }

  public getCosts() {
    return this.http.get(`${environment.apiUrl}/payment`)
  }

  public addCredits(data: any) {
    return this.http.post(`${environment.apiUrl}/settings/add/credits`, data)
  }


}
