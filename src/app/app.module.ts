import { BrowserModule } from '@angular/platform-browser';
import { OAuthModule } from 'angular-oauth2-oidc';
import { NgModule } from '@angular/core';
import { ApiModule } from './api/api.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ApiModule.forRoot({rootUrl: ''}),
    BrowserModule,
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ['/tables'],
          sendAccessToken: true
      }
  }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
