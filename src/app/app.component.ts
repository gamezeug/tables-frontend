import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { Component } from '@angular/core';
import { authConfig } from './auth.config';
import { JwtHelperService } from "@auth0/angular-jwt";
import { TableRestControllerService } from './api/services'
import { Table } from './api/models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  table = 'none';

  constructor(private tableRestControllerService: TableRestControllerService, private oauthService: OAuthService) { 
    this.configure();
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logOut() {
    this.oauthService.logOut();
  }

  public getTables() {
    this.tableRestControllerService.getTablesUsingGET().subscribe((data: Array<Table>) => this.table = JSON.stringify(data));
  }

  public createTable() {
    const params: TableRestControllerService.CreateTableUsingPOSTParams = {
      table: {
        id: '1',
        status: 'OPEN',
        maxNumberOfPlayers: 2,
        name: 'new table',
        players: []
      }
    };
    this.tableRestControllerService.createTableUsingPOST(params).subscribe((data: Table) => this.table = JSON.stringify(data));
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
    const helper = new JwtHelperService();
    return helper.decodeToken(token);
  }

}
