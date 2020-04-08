import { Component, OnInit } from '@angular/core';

// services

import { TranslateService } from '@ngx-translate/core';
import { SessionService } from '../../auth/session.service';

// store
import { Store } from '@ngrx/store';
import { SessionState } from '../../auth/store/session.store';
import { SetLanguage } from '../../auth/store/session.action';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  selectedLanguage = 'en';

  constructor(
    private _translateService: TranslateService,
    private _sessionService: SessionService,
    private _sessionStore: Store<SessionState>,
  ) { }

  ngOnInit() {
  }

  setLanguage(lang): void {
    // Set the selected language for the toolbar
    this.selectedLanguage = lang;
    // Use the selected language for translations
    this._sessionStore.dispatch(new SetLanguage(lang));
    this._sessionService.setLanguage(lang);
    this._translateService.use(lang);
  }


}
