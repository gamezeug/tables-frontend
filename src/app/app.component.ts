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
  table = 'none';

  constructor(private http: HttpClient, private oauthService: OAuthService) { 
    this.configure();
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logOut() {
    this.oauthService.logOut();
  }

  public getTables() {
    this.http.get('/tables/tables').subscribe((data: string) => this.table = JSON.stringify(data));
  }

  public createTable() {
    this.http.post('/tables/tables', {
      id: '1',
      status: 'OPEN',
      maxNumberOfPlayers: 2,
      name: 'new table',
      players: []
    }).subscribe((data: string) => this.table = JSON.stringify(data));
  }

  public isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  public getName() {
    let accessToken = this.oauthService.getAccessToken();
    let decodedAccessToken = this.getDecodedAccessToken(accessToken);
    return decodedAccessToken.user_name;
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.tryLogin();
  }

  private getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    } catch(Error){
        return null;
    }
  }

}
