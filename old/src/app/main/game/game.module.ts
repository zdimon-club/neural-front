import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { GameComponent } from './game.component';

const routes = [
    {
        path     : '**',
        component: GameComponent
    }
];

@NgModule({
    declarations: [
        GameComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        SharedModule,
    ],
    providers: []
})
export class GameModule {
}
