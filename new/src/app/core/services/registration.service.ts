import { apiUrls } from './../../../environments/api.urls';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import { Store } from '@ngrx/store';
import { SessionState } from '../../auth/store/session.store';
import { selectIsAuth } from '../../auth/store/session.selector';

@Injectable()
export class RegistrationService {
  constructor(
    private http: HttpClient,
    public injector: Injector,
    private session_store: Store<SessionState>,
  ) {
    this.session_store.select(selectIsAuth).subscribe((value) => {
      this.isAuth = value;
    });
  }

  isAuth = false;
  registrationSuggestionTimeoutId = null;

  public getFormProps(gender: string) {
    return this.http.get(`${apiUrls.props_list}${gender}`);
  }

  public registerWoman(data: any) {
    return this.http.post(`${apiUrls.register_woman}`, data);
  }

  public registerMan(data: any) {
    return this.http.post(`${apiUrls.register_man}`, data);
  }

  public registerAgency(data: any) {
    return this.http.post(`${apiUrls.register_agency}`, data);
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
    return this.http.post(`${apiUrls.email_check}`, data);
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
    return this.http.post<{ status: string }>(`${apiUrls.new_password}`, data);
  }

  public handleInitRegisterSuggestionPopup() {
    if (!this.isAuth) {
      this.registrationSuggestionTimeoutId = setTimeout(() => {
        if (!this.isAuth) {
          // this.registration_store.dispatch(
          //   new registrationActions.ToggleSuggestionPopup({ is_opened: true }),
          // );
        }
      }, 120 * 1000); // 120 sec
    }
  }

  public clearRegisterSuggestionPopupTimeout() {
    clearTimeout(this.registrationSuggestionTimeoutId);
  }
}
