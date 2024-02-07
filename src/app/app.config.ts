import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorHandlerInterceptor])),
    provideAnimationsAsync(),
  ],
};

const firebaseConfig = {
  apiKey: 'AIzaSyArESuLPf9M02AvGGn3ffDaAbKbIhPW8s4',
  authDomain: 'frontend-technical-test-93a94.firebaseapp.com',
  projectId: 'frontend-technical-test-93a94',
  storageBucket: 'frontend-technical-test-93a94.appspot.com',
  messagingSenderId: '440487141436',
  appId: '1:440487141436:web:f9294dbbc739303220a339',
  measurementId: 'G-S7CTMW43FL',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
