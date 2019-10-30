import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { authConfig } from './auth.config';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'gamezeug-tables';

  constructor(private http: HttpClient, private oauthService: OAuthService) { 
    this.configure();
  }

  public flow() {
    this.oauthService.initImplicitFlow();
  }

  public login() {
    this.oauthService.tryLogin({
      onTokenReceived: (receivedTokens) => {
        console.log(receivedTokens);
      }
    });
  }

  public logoff() {
    this.oauthService.logOut();
  }

  public name() {
    this.title = this.getName();
  }

  public test() {
    this.getTest().subscribe((data: string) => this.title = data);
  }

  public getName() {
    let accessToken = this.oauthService.getAccessToken();
    let decodedAccessToken = this.getDecodedAccessToken(accessToken);
    return decodedAccessToken.user_name;
  }

  getTest() {
    return this.http.get('/tables/test');
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  }

  private getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    } catch(Error){
        return null;
    }
  }

}
