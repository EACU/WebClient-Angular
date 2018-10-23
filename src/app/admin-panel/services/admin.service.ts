import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BaseService } from '../../../shared/services/base.service';
import { ConfigService } from '../../../shared/utils/config.service';

import { catchError } from 'rxjs/operators';
import { AdminDetails } from '../models/admin.details.interface';


@Injectable()

export class AdminService extends BaseService {

  baseUrl = '';

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.baseUrl = this.configService.getApiURI();
  }

  getAdminDetails() {
    return this.http.get<AdminDetails>(this.baseUrl + '/admin/dashboard').pipe(catchError(this.handleError));
  }

}
