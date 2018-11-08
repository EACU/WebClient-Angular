import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

import { UserDetails } from '../models/user.information.interface';

import { ConfigService } from '../utils/config.service';
import { BaseService } from './base.service';

import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { default as decode } from 'jwt-decode';
import { IUserTokens } from '../models/user.tokens.interface';
import { AuthService } from 'src/app/account/services/auth.service';

@Injectable()
export class UserService extends BaseService {

    baseUrl: string;

    constructor(private http: HttpClient, private configService: ConfigService, private authService: AuthService) {
        super();
        this.baseUrl = this.configService.getApiURI();
    }

    getAuthenticationToken(): string {
        return localStorage.getItem('accessToken');
    }

    getUserDetails(): Observable<UserDetails> {
        return this.http.get<UserDetails>(this.baseUrl + '/account/information/').pipe(catchError(this.handleError));
    }

    getCurrentUser(): UserDetails {
        const token = this.getAuthenticationToken();
        if (token) {
            const decodeToken = decode(token);
            return { firstName: decodeToken.name.split(' ')[0], lastName: decodeToken.name.split(' ')[1], pictureUrl: decodeToken.pic };
        }
    }

    getRefreshToken(): Observable<IUserTokens> {
        const refreshToken = localStorage.getItem('refreshToken');
        const body = JSON.stringify({ token: refreshToken });
        const httpOptions = {headers: new HttpHeaders({ 'Content-Type':  'application/json' })};
        return this.http.post<IUserTokens>(this.baseUrl + '/token/refresh', body, httpOptions).pipe(catchError(this.handleError));
    }

    isMatchRole(role: string): boolean {
        const token = this.getAuthenticationToken();
        if (token) {
            const decodeToken = decode(token);
            if (typeof decodeToken.rol !== 'undefined') {
                return decodeToken.rol.includes(role);
            }
        }
        return false;
    }
}
