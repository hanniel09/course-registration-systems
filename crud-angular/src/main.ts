import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


import {importProvidersFrom} from '@angular/core';
import {AppComponent} from './app/app.component';
import {withInterceptorsFromDi, provideHttpClient} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {provideAnimations} from '@angular/platform-browser/animations';
import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';
import {CourseResolver} from './app/courses/guards/course.resolver';
import {PreloadAllModules, provideRouter, withPreloading} from "@angular/router";
import {APP_ROUTES} from "./app/app.routes";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, MatToolbarModule),
    CourseResolver,
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules))
  ]
})
  .catch(err => console.error(err));
