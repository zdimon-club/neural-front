import { Observable } from 'rxjs';

/* author Dmitry zdimon77@gmail.com skype zdimon77 */

import { Component } from '@angular/core';
import { SocketService } from './socket/socket.service';
import { TranslateService } from '@ngx-translate/core';


import { SpinnerService } from './core/services/spinner.service';

import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loading = false;
  spinner: Observable<boolean>;

 constructor(
  private _translateService: TranslateService,
  private _spinnerService: SpinnerService,
  private _router: Router
   ) {
    // Set the default language
    this._translateService.setDefaultLang('en');
    // Use a language
    this._translateService.use('en');

    this.spinner = this._spinnerService.visibility;

    this._router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd: {
          this.loading = false;
          break;
        }

        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

 }



}
