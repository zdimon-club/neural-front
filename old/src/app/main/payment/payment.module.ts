
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { PaymentComponent } from './payment.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransactionHistoryService } from './transaction-history/transaction-history.service';


const routes: Routes = [
  {
    path: '**',
    component: PaymentComponent,
    children: [],
  },
];

@NgModule({
  declarations: [PaymentComponent, TransactionHistoryComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    SharedModule,
    ImageCropperModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
  ],
  providers: [TransactionHistoryService],
})
export class PaymentModule {}
