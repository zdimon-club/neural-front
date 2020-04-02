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
    loadChildren: './main/post/post.module#PostModule',
  },
  {
    path: 'typo',
    loadChildren: './main/typo/typo.module#TypoModule',
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule',
  },

  {
    path: 'myprofile',
    loadChildren: './pages/myprofile/myprofile.module#MyprofileModule',
  },

  {
    path: 'priv-chat',
    loadChildren: './pages/priv-chat/priv-chat.module#PrivChatModule',
  },

  // {
  // path: 'reset/pass/:token',
  // loadChildren: './main/registration/resetpass/reset.pass.module#ResetPassModule'
  // },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}