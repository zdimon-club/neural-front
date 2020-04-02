import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from '../registration.service';
import { ConfirmComponent, IConfirmationModalBody } from '../../../modal/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget.pass.component.html',
  styleUrls: ['./forget.pass.component.scss'],
})
export class ForgetPassComponent implements OnInit, OnDestroy {
  forgetPassForm: FormGroup;
  private unsubscribeAll: Subject<any>;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private registrationService: RegistrationService,
    private matDialog: MatDialog,
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.forgetPassForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(
        '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.email],
        [this.registrationService.validateEmailTaken.bind(this)]],
    });
  }

  onSubmit() {
    const data = { email: this.forgetPassForm.get('email').value };

    this.registrationService.resetPassword(data)
      .subscribe((res) => {
          if (res.status === 'OK') {
            const dialogData: IConfirmationModalBody = {
              title: 'Please check your Email address',
              type: 'default',
              content: '',
              buttons: [
                { title: 'cancel', link: '', action: 'reject', type: 'outline' },
                { title: 'GO to maul', link: '/', action: 'navigate', type: 'default' },
              ],
            };

            this.matDialog.open(ConfirmComponent, { data: dialogData, panelClass: 'confirm-dialog' });
          }
        },
        error => {
          console.log(error);
        },
      );
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
