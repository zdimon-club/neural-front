import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AbstractControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import { Store } from '@ngrx/store';
import { RegistrationState } from './store/registration.store';
import * as registrationActions from './store/registration.action';
import { SessionState } from '../../auth/store/session.store';
import { selectIsAuth } from '../../auth/store/session.selector';

@Injectable()
export class RegistrationService {
  constructor(
    private http: HttpClient,
    public injector: Injector,
    private registration_store: Store<RegistrationState>,
    private session_store: Store<SessionState>,
  ) {
    this.session_store.select(selectIsAuth).subscribe((value) => {
      this.isAuth = value;
    });
  }

  isAuth = false;
  registrationSuggestionTimeoutId = null;

  public getFormProps(gender: string) {
    return this.http.get(`${environment.apiUrl}/props/list/${gender}`);
  }

  public registerWoman(data: any) {
    return this.http.post(`${environment.apiUrl}/account/register/woman`, data);
  }

  public registerMan(data: any) {
    return this.http.post(`${environment.apiUrl}/account/register/man`, data);
  }

  public registerAgency(data: any) {
    return this.http.post(`${environment.apiUrl}/account/register/agency`, data);
  }

  public validateEmailNotTaken = (input: AbstractControl) => {
    return this.checkEmailNotTaken(input.value).pipe(
      debounceTime(5000),
      map((rez: any) => {
        if (rez.status === 1) {
          return {
            isExists: true,
          };
        }
        return null;
      }),
    );
  };

  public validateEmailTaken = (input: AbstractControl) => {
    return this.checkEmailNotTaken(input.value).pipe(
      debounceTime(5000),
      map((rez: any) => {
        if (rez.status === 1) {
          return null;
        }
        return {
          isExists: true,
        };
      }),
    );
  };

  private checkEmailNotTaken(email: string) {
    const data = { email };
    return this.http.post(`${environment.apiUrl}/check/email`, data);
  }

  public getBase64(file) {
    return new Observable((observer: Observer<string>) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imgd = reader.result as string;
        observer.next(imgd);
        // observer.next(imgd.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
        observer.complete();
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
        observer.complete();
      };
    });
  }

  resetPassword(data: { email: string }) {
    return this.http.post<{ status: string }>(`${environment.apiUrl}/account/reset_password`, data);
  }

  public handleInitRegisterSuggestionPopup() {
    if (!this.isAuth) {
      this.registrationSuggestionTimeoutId = setTimeout(() => {
        if (!this.isAuth) {
          this.registration_store.dispatch(
            new registrationActions.ToggleSuggestionPopup({ is_opened: true }),
          );
        }
      }, 120 * 1000); // 120 sec
    }
  }

  public clearRegisterSuggestionPopupTimeout() {
    clearTimeout(this.registrationSuggestionTimeoutId);
  }
}
