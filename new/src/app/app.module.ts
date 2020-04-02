import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketService } from './socket/socket.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SessionService } from './auth/session.service';

// root store
import { AppStoreModule } from './store/store.module';

// app

import { SharedModule } from './shared.module';
import { LayoutModule } from './layout/layout.module';

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
  ],
  providers: [
    SocketService,
    SessionService
  ],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule]
})
export class AppModule { }
