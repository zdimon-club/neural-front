
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { SharedModule } from './../shared.module';
import { UserPanelComponent } from './user-panel/user-panel/user-panel.component';

@NgModule({
  declarations: [LayoutComponent, FooterComponent, HeaderComponent, UserPanelComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
