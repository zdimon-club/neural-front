import { RegistrationService } from './../registration/registration.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared.module';

const routes = [
    {
        path     : '**',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatCheckboxModule,
        MatIconModule,
        MatInputModule,
        SharedModule,
    ],
    providers: [RegistrationService]
})
export class LoginModule {
}
