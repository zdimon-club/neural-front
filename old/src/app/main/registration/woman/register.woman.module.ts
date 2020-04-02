import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { RegisterWomanComponent } from './register.woman.component';
import { RegistrationService } from '../registration.service';
import { SharedModule } from '../../../shared.module';


const routes = [
    {
        path     : '**',
        // component: RegisterWomanComponent
    }
];

@NgModule({
    declarations: [
        // RegisterWomanComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        SharedModule
    ],
    providers: [RegistrationService]
})
export class RegisterWomanModule {
}
