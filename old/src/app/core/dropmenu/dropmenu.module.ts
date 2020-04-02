import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideModule } from 'ng-click-outside';
import { TranslateModule } from '@ngx-translate/core';

import { DropmenuComponent } from './dropmenu.component';

@NgModule({
  declarations: [DropmenuComponent],
  imports: [
    CommonModule,
    ClickOutsideModule,
    TranslateModule
  ],
  exports: [DropmenuComponent],
})
export class DropMenuModule {
}
