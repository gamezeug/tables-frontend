/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Table } from '../models/table';

/**
 * Table Rest Controller
 */
@Injectable({
  providedIn: 'root',
})
class TableRestControllerService extends __BaseService {
  static readonly getTablesUsingGETPath = '/tables';
  static readonly createTableUsingPOSTPath = '/tables';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param name undefined
   * @return OK
   */
  getTablesUsingGETResponse(name?: string): __Observable<__StrictHttpResponse<Array<Table>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (name != null) __params = __params.set('name', name.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tables`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Table>>;
      })
    );
  }
  /**
   * @param name undefined
   * @return OK
   */
  getTablesUsingGET(name?: string): __Observable<Array<Table>> {
    return this.getTablesUsingGETResponse(name).pipe(
      __map(_r => _r.body as Array<Table>)
    );
  }

  /**
   * @param params The `TableRestControllerService.CreateTableUsingPOSTParams` containing the following parameters:
   *
   * - `table`: table
   *
   * - `name`:
   *
   * @return OK
   */
  createTableUsingPOSTResponse(params: TableRestControllerService.CreateTableUsingPOSTParams): __Observable<__StrictHttpResponse<Table>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.table;
    if (params.name != null) __params = __params.set('name', params.name.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tables`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Table>;
      })
    );
  }
  /**
   * @param params The `TableRestControllerService.CreateTableUsingPOSTParams` containing the following parameters:
   *
   * - `table`: table
   *
   * - `name`:
   *
   * @return OK
   */
  createTableUsingPOST(params: TableRestControllerService.CreateTableUsingPOSTParams): __Observable<Table> {
    return this.createTableUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as Table)
    );
  }
}

module TableRestControllerService {

  /**
   * Parameters for createTableUsingPOST
   */
  export interface CreateTableUsingPOSTParams {

    /**
     * table
     */
    table: Table;
    name?: string;
  }
}

export { TableRestControllerService }
