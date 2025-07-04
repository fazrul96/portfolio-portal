import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideStore} from '@ngxs/store';
import {provideAuth0} from '@auth0/auth0-angular';
import {withNgxsStoragePlugin} from '@ngxs/storage-plugin';
import {withNgxsReduxDevtoolsPlugin} from '@ngxs/devtools-plugin';
import {withNgxsResetPlugin} from 'ngxs-reset-plugin';
import {withNgxsLoggerPlugin} from '@ngxs/logger-plugin';
import {provideNgxStripe} from 'ngx-stripe';
import {routes} from './app.routes';
import {environment} from '../environments/environment';
import {loggingHttpInterceptor} from './core/interceptors/logging-http.interceptor';
import {errorHandlingInterceptor} from './core/interceptors/error-handling.interceptor';
import {loadingInterceptor} from './core/interceptors/loading.interceptor';
import {userAuthInterceptor} from './core/interceptors/user-auth.interceptor';
import {UserState} from './store/user/user.state';
import {PaymentState} from './store/payment/payment.state';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {FlexLayoutModule} from 'ng-flex-layout';
import {ProjectState} from './store/project/project.state';
import {ExperienceState} from './store/experience/experience.state';
import {BlogState} from './store/blog/blog.state';
import {DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule} from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  createImageThumbnails: true,
  acceptedFiles: 'image/*'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding()
    ),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([
        errorHandlingInterceptor,
        loadingInterceptor,
        loggingHttpInterceptor,
        userAuthInterceptor
      ])
    ),
    provideAuth0({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: environment.auth0.authorizationParams.redirect_uri,
        audience: environment.auth0.authorizationParams.audience,
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
    }),
    provideNgxStripe(environment.stripe.publishableKey),
    provideStore(
      [UserState, PaymentState, ProjectState, ExperienceState, BlogState],
      withNgxsStoragePlugin({
        keys: '*',
        storage: 1,
      }),
      withNgxsResetPlugin(),
      withNgxsReduxDevtoolsPlugin(),
      withNgxsLoggerPlugin({ disabled: environment.production })
    ),
    importProvidersFrom(PdfViewerModule, FlexLayoutModule),
    importProvidersFrom(DropzoneModule),
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
  ]
};
