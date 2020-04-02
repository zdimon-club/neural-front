import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    loadChildren: './main/catalog/catalog.module#CatalogModule',
  },
  {
    path: 'userlist',
    loadChildren: './main/userlist/userlist.module#UserlistModule',
  },
  {
    path: 'login',
    loadChildren: './main/login/login.module#LoginModule',
  },
  {
    path: 'register/man',
    loadChildren: './main/registration/man/register.man.module#RegisterManModule',
  },
  {
    path: 'register/woman',
    loadChildren: './main/registration/woman/register.woman.module#RegisterWomanModule',
  },
  {
    path: 'register/agency',
    loadChildren: './main/registration/agency/register.agency.module#RegisterAgencyModule',
  },
  {
    path: 'profile/:id',
    loadChildren: './main/profile/profile.module#ProfileModule',
  },
  {
    path: 'forget/pass',
    loadChildren: './main/registration/forgetpass/forget.pass.module#ForgetPassModule',
  },
  {
  path: 'reset/pass/:token',
  loadChildren: './main/registration/resetpass/reset.pass.module#ResetPassModule'
  },
  {
    path: 'chat',
    loadChildren: './main/chat/chat.module#ChatModule',
  },
  {
    path: 'payment',
    loadChildren: './main/payment/payment.module#PaymentModule',
  },
  {
    path: 'game',
    loadChildren: './main/game/game.module#GameModule',
  },
  {
    path: 'cardgame',
    loadChildren: './main/game/card/cardgame.module#CardGameModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
