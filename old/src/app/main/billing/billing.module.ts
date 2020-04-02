import { BillingService } from './billing.service';
import { SharedModule } from './../../shared.module';
import { BillingPopupComponent } from './billing.component';
import { NgModule } from '@angular/core';



@NgModule({
    declarations: [
        BillingPopupComponent
    ],
    imports     : [
        SharedModule
    ],
    providers: [BillingService],
    entryComponents: [BillingPopupComponent]
})
export class BillingModule {
}
