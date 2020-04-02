import { ProfileService } from './../../main/profile/profile.service';
import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { SnackbarMessage } from './snackbar.model';
import { SnackbarComponent } from './snackbar.component';


@Injectable()
export class SnackbarService {

  constructor(
    private toastrService: ToastrService,
    private profile_service: ProfileService
    ) {
  }

  /**
   *  implement SnackbarService into constructor to call showToast()
   *
   * @param msg
   * @optional parameter - timeout, if missed will be used default timeout which equals to 5 seconds;
   *
   *
   * @example
   * this.snackbarService.showToast({
   *  author: 'author of the message',
   *  message: 'body of the message',
   *  id: 'id of chat room to which should route',
   *  avatar: 'image pf the author',
   *  timeout: 1000
   * })
   */
  public showToast(data: any): void {
    this.profile_service.getProfileDetail(data.abonent_id).subscribe(res => {
      
      let mes = new SnackbarMessage(res[data.abonent_id],data);
      // console.log(mes);
      // TODO глупо гнать всю комнату
      this.toastrService.show(mes.message, mes.author, {
        toastClass: mes.avatar,
        titleClass: data.abonent_id,
        timeOut: mes.timeout || 15000,
        toastComponent: SnackbarComponent,
        closeButton: true,
      });
      
    })

  }
}