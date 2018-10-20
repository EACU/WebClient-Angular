import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BaseService } from '../../../shared/services/base.service';
import { ConfigService } from '../../../shared/utils/config.service';

import { HomeDetails } from '../models/home.details.interface';

import { catchError } from 'rxjs/operators';


@Injectable()

export class DashboardService extends BaseService {

  baseUrl = '';

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.baseUrl = this.configService.getApiURI();
  }

  getHomeDetails() {
    const authToken = localStorage.getItem('auth_token');
    const httpOptions = {headers: new HttpHeaders({ 'Authorization':  `Bearer ${authToken}` })};
    return this.http.get<HomeDetails>(this.baseUrl + '/dashboard', httpOptions).pipe(catchError(this.handleError));
  }
}
