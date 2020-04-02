import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// http
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

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

// init service
import { APP_INITIALIZER } from '@angular/core';
import { InitService } from './auth/init.service';
export function init_app(initService: InitService) {
  return () => initService.init();
}



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
  ],
  providers: [
    SocketService,
    SessionService,
    LoginService,
    OnlineSocketService,
    InitService,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [InitService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule]
})
export class AppModule { }
