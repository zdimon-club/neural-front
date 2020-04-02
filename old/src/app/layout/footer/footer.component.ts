import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { SetLanguage } from '../../auth/store/session.action';
import { SessionService } from '../../auth/session.service';
import { TranslateService } from '@ngx-translate/core';
// store
import { Store } from '@ngrx/store';
import { SessionState } from '../../auth/store/session.store';
import { selectIsAuth } from '../../auth/store/session.selector';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @ViewChild('navigationLinks', { static: true })
  private navigationLinksBlock: ElementRef;
  selectedLanguage: 'en' | 'ru' = 'en';

  @HostListener('mouseenter', ['$event']) onEnter(e: MouseEvent) {
    this.showNavigationLinks();
  }

  @HostListener('mouseleave', ['$event']) onLeave(e: MouseEvent) {
    this.hideNavigationLinks();
  }

  constructor(
    private viewScroll: ViewportScroller,
    private _sessionStore: Store<SessionState>,
    private _translateService: TranslateService,
    private _sessionService: SessionService,
  ) {
  }

  private showNavigationLinks(): void {
    this.navigationLinksBlock.nativeElement.classList.add('d-xl-flex');

    this.scrollToFooterFullView();
  }

  private hideNavigationLinks(): void {
    this.navigationLinksBlock.nativeElement.classList.remove('d-xl-flex');
  }

  private scrollToFooterFullView(): void {
    const scrollHeight = document.documentElement.scrollHeight;

    this.viewScroll.scrollToPosition([0, scrollHeight]);
  }


  setLanguage(lang): void {
    // Set the selected language for the toolbar
    this.selectedLanguage = lang;
    // Use the selected language for translations
    this._sessionService.setLanguage(lang);
    this._translateService.use(lang);

    this._sessionStore.select(selectIsAuth)
      .pipe(
        filter(isAuth => !!isAuth),
      )
      .subscribe(() => {
        this._sessionStore.dispatch(new SetLanguage(lang));
      });
  }
}
