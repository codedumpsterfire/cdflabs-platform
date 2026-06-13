import 'zone.js';
import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import './styles.scss';

const config: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
  ],
};

bootstrapApplication(AppComponent, config).catch(err => console.error(err));
