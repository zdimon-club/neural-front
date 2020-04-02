import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ConfirmComponent, IConfirmationModalBody } from '../../../modal/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SessionState } from '../../../auth/store/session.store';
import { selectUser } from '../../../auth/store/session.selector';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset.pass.component.html',
  styleUrls: ['./reset.pass.component.scss'],
})
export class ResetPassComponent implements OnInit, OnDestroy {
  resetPassForm: FormGroup;
  private token = '';
  private unsubscribeAll: Subject<any>;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private session_store: Store<SessionState>,
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.resetPassForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      againPassword: ['', [Validators.required]],
    });
    this.token = this.route.snapshot.params.token;
  }

  onSubmit() {
    const data = {
      password: this.resetPassForm.get('password').value,
      token: this.token,
    };

    if (data.password.length < 6) { // TODO: need pattern
      const dialogData: IConfirmationModalBody = {
        title: 'Incorrect password',
        type: 'warning',
        content: 'The entered password is too weak, use a complex password',
        buttons: [
          { title: 'cancel', link: '', action: 'reject', type: 'outline' },
        ],
      };

      this.matDialog.open(ConfirmComponent, { data: dialogData, panelClass: 'confirm-dialog' });
      return;
    }

    this.http.post(`${environment.apiUrl}/account/reset_password/confirm`, data)
      .subscribe((res: any) => {
        const dialogData: IConfirmationModalBody = {
          title: 'You have successfully changed your password!',
          type: 'default',
          content: `You have successfully changed your password to access the site Neural DATE.
             The next time you log in to the site, use the new data. Want to change your password?
              Use the <a href="/forget/pass">password recovery service.`,
          buttons: [
            { title: 'GO TO PROFILE', link: 'login', action: 'navigate', type: 'default' },
          ],
        };

        this.matDialog.open(ConfirmComponent, { data: dialogData, panelClass: 'confirm-dialog' });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
