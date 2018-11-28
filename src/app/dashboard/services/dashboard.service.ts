import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BaseService } from '../../../shared/services/base.service';
import { ConfigService } from '../../../shared/utils/config.service';

import { StudentDetails } from '../models/student.details.interface';

import { catchError } from 'rxjs/operators';


@Injectable()

export class DashboardService extends BaseService {

  baseUrl = '';

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.baseUrl = this.configService.getApiURI();
  }

  getHomeDetails() {
    return this.http.get<any>(this.baseUrl + '/student/dashboard').pipe(catchError(this.handleError));
  }
}
