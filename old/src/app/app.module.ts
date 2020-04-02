// Components

// Modules
import { ClickOutsideModule } from 'ng-click-outside';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToModule } from 'ng2-scroll-to-el';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { APP_INITIALIZER } from '@angular/core';
import { SocketIoModule } from 'ngx-socket-io';
import { SharedModule } from './shared.module';

import { RegisterSuggestionPopupModule } from './main/registration/register-suggestion-popup/register-suggestion-popup.module';

// Services
import { InitService } from './auth/init.service';
import { LoginService } from './auth/login.service';
import { SessionService } from './auth/session.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'angularx-social-login';
import { ChatService } from './main/chat/services/chat.service';
import { UserService } from './main/users/user.service';
import { SmallChatService } from './core/small-chat/small-chat.service';
import { SnackbarService } from './core/snackbar/snackbar.service';
import { ProfileService } from './main/profile/profile.service';
import { MediaService } from './main/chat/services/media.service';
import { RegistrationService } from './main/registration/registration.service';

// socket

import { SOCKET_CONFIG, SocketService } from './socket/socket.service';

///// translating
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// Store
import { AppStoreModule } from './store/store.module';

import { SmallChatModule } from './core/small-chat/small-chat.module';

// Interceptors
import { ErrorInterceptor } from './core/interceptors/error';
import { AuthInterceptor } from './core/interceptors/auth.interseptor';

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.apiUrl}/i18n/`, '.json');
}

export function init_app(initService: InitService) {
  return () => initService.init();
}

// Social authentication
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.GOOGLE_AUTH),
  },
]);

export function provideConfig() {
  return config;
}

//////////////////////////

// App modules
import { BillingModule } from './main/billing/billing.module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { GestureConfig } from '@angular/material';
import { ModalModule } from './modal/modal.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    RegisterSuggestionPopupModule,
    SharedModule,
    SmallChatModule,
    ClickOutsideModule,
    PerfectScrollbarModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CarouselModule,
    ScrollToModule,
    BrowserAnimationsModule,
    LayoutModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      tapToDismiss: false,
      maxOpened: 4,
      preventDuplicates: true,
    }),
    ToastContainerModule,
    HttpClientModule,
    AppStoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SocketIoModule.forRoot(SOCKET_CONFIG),
    BillingModule,
    ModalModule
  ],
  providers: [
    RegistrationService,
    interceptorProviders,
    LoginService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: GestureConfig,
    },
    InitService,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [InitService],
      multi: true,
    },
    SessionService,
    MatDialog,
    SocketService,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    ChatService,
    UserService,
    SmallChatService,
    SnackbarService,
    ProfileService,
    MediaService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
