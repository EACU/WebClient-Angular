import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from '../models/user.information.interface';

import { ConfigService } from '../utils/config.service';
import { BaseService } from './base.service';

import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { default as decode } from 'jwt-decode';

@Injectable()
export class UserService extends BaseService {

    private baseUrl: string;

    private _currentUserSource: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
    readonly currentUser$ = this._currentUserSource.asObservable();

    constructor(private http: HttpClient, private configService: ConfigService) {
        super();
        this.baseUrl = this.configService.getApiURI();
    }

    getAuthenticationToken(): string {
        return localStorage.getItem('accessToken');
    }

    setCurrentUser (user: IUser) {
        this._currentUserSource.next(user);
    }

    getApiUserInformation(): Observable<IUser> {
        return this.http.get<IUser>(this.baseUrl + '/account/information/').pipe(catchError(this.handleError));
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
