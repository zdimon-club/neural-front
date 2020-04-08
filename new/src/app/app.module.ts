

/* author Dimitry Zharikov zdimon77@gmail.com */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

// http client and interceptor
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error';
import { AuthInterceptor } from './core/interceptors/auth.interseptor';
export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];

import { apiUrls } from './../environments/api.urls';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SessionService } from './auth/session.service';

// root store
import { AppStoreModule } from './store/store.module';

// app

import { SharedModule } from './shared.module';
import { LayoutModule } from './layout/layout.module';

// services

import { SocketService } from './socket/socket.service';
import { OnlineSocketService } from './socket/online.service';
import { LoginService } from './auth/login.service';
import { UserlistService } from './main/userlist/userlist.service';
import { UserOnlineService } from './main/users/usersonline.service';
import { SpinnerService } from './core/services/spinner.service';

// init service
import { APP_INITIALIZER } from '@angular/core';
import { InitService } from './auth/init.service';
export function init_app(initService: InitService) {
  return () => initService.init();
}

///// translating
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, apiUrls.i18n, '.json');
}
/////////////////

import { SpinnerHttpInterceptor } from './core/interceptors/spinner.interceptor';


// Social auth
import { 
  AuthServiceConfig,
  GoogleLoginProvider,
  AuthService,
  SocialLoginModule } from 'angularx-social-login';
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.GOOGLE_AUTH),
  },
]);
export function provideConfig() {
  return config;
}
///////////////

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule,
    AppStoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    SocketService,
    SessionService,
    LoginService,
    OnlineSocketService,
    UserOnlineService,
    InitService,
    AuthService,
    interceptorProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerHttpInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [InitService],
      multi: true,
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    UserlistService,
    SpinnerService
  ],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule]
})
export class AppModule { }
