import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ErrorAuthenticateInterceptor } from './shared/helpers/error-authenticate.interceptor';
import { AuthInterceptor } from './shared/helpers/jwt.interceptor';
import { LoaderInterceptor } from './shared/helpers/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers:
  [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // token bearer
    { provide: HTTP_INTERCEPTORS, useClass: ErrorAuthenticateInterceptor, multi: true }, // authenticate 403
  ]
};

