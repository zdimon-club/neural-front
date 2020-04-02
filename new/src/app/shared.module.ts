import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    
  ],
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    FlexLayoutModule,
  ],
  providers: [],
  entryComponents: [],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    RouterModule,
    FormsModule,
    FlexLayoutModule,
  ]
})
export class SharedModule {}
