import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../../../shared/utils/config.service';

import { BaseService } from '../../../shared/services/base.service';
import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable()
export class AuthService extends BaseService {

    baseUrl: string;

    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    authNavStatus$ = this._authNavStatusSource.asObservable();

    private loggedIn = false;

    constructor(private http: HttpClient, private configService: ConfigService) {
        super();
        this.loggedIn = !!localStorage.getItem('accessToken');
        this._authNavStatusSource.next(this.loggedIn);
        this.baseUrl = this.configService.getApiURI();
    }

    register(email: string, password: string, firstName: string, lastName: string, group: string): Observable<UserRegistration> {
        const body = JSON.stringify({ email, password, firstName, lastName, group});
        const httpOptions = {headers: new HttpHeaders({ 'Content-Type':  'application/json' })};
        return this.http.post<UserRegistration>(this.baseUrl + '/accounts/register', body, httpOptions);
    }

    login(userName, password): Observable<boolean> {
        return this.http.post<{accessToken, refreshToken, expires_in, error}>(this.baseUrl + '/accounts/login', {userName, password}).pipe(
            map(res => {
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                localStorage.setItem('expires_in', res.expires_in);
                this.loggedIn = true;
                this._authNavStatusSource.next(true);
                return true;
            })
        );
    }

    logout() {
        localStorage.clear();
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}
