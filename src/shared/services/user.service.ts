import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserInformation } from '../models/userInformation.interface';
import { ConfigService } from '../utils/config.service';

import { BaseService } from './base.service';

import { catchError } from 'rxjs/operators';
import { default as decode } from 'jwt-decode';

@Injectable()
export class UserService extends BaseService {

    baseUrl: string;

    constructor(private http: HttpClient, private configService: ConfigService) {
        super();
        this.baseUrl = this.configService.getApiURI();
    }

    userRoles(): string[] {
        const token = localStorage.getItem('auth_token');
        if (token) {
            const decodeToken = decode(token);
            if (typeof decodeToken.rol !== 'undefined') {
                return decodeToken.rol;
            }
            return ['not roles'];
        }
        return ['not token'];
    }

    userInformation() {
        const authToken = localStorage.getItem('auth_token');
        const httpOptions = {headers: new HttpHeaders({ 'Authorization':  `Bearer ${authToken}` })};
        return this.http.get<UserInformation>(this.baseUrl + '/accounts/information/', httpOptions).pipe(catchError(this.handleError));
    }

    isMatchRole(role: string): boolean {
        const userRoles = this.userRoles();
        return userRoles.includes(role);
    }

    getToken() {
        return localStorage.getItem('auth_token');
    }
}
