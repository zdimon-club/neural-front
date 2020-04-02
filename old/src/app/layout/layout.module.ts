
// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// app
import { SharedModule } from './../shared.module';
import { ClickOutsideModule } from 'ng-click-outside';

import { BaseLayoutComponent } from './base/base.layout.component';
import { HeaderNavbarComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BurgerMenuComponent } from './header/burger-menu/burger-menu.component';
import { NotificationsMenuComponent } from './header/notifications-menu/notifications-menu.component';
import { MessagesMenuComponent } from './header/messages-menu/messages.menu.component';
import { HeaderDefaultComponent } from './header/header-default/header-default.component';
import { HeaderMobileComponent } from './header/header-mobile/header-mobile.component';
import { HelperService } from '../core/services/helper.service';
import { SearchComponent } from './header/search/search.component';
// import { BillingPopupComponent } from './../main/billing/billing.popup.component';
// import { BillingService } from './../main/billing/billing.service';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    HeaderNavbarComponent,
    FooterComponent,
    NotificationsMenuComponent,
    MessagesMenuComponent,
    BurgerMenuComponent,
    HeaderDefaultComponent,
    HeaderMobileComponent,
    SearchComponent
    // BillingPopupComponent
  ],
  imports: [
    // FuseSharedModule,
    RouterModule,
    SharedModule,
    ClickOutsideModule,
  ],
  exports: [BaseLayoutComponent],
  providers: [
    // BillingService,
    HelperService,
  ],
  entryComponents: [
    // BillingPopupComponent
  ],
})
export class LayoutModule {}
