import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { StudentRegistrationViewModel } from '../models/RegistationViewModels/student.registration';
import { ConfigService } from '../../../shared/utils/config.service';

import { BaseService } from '../../../shared/services/base.service';
import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { ILoginResponse } from '../models/loginResponse.interface';

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

    registerStudent(student: StudentRegistrationViewModel): Observable<string> {
        const body = JSON.stringify(student);
        const httpOptions = {headers: new HttpHeaders({ 'Content-Type':  'application/json' })};
        return this.http.post<string>(this.baseUrl + '/account/register/student', body, httpOptions);
    }

    login(userName, password): Observable<boolean> {
        return this.http.post<ILoginResponse>(this.baseUrl + '/account/login', {userName, password}).pipe(
            map(loginResponse => {
                localStorage.setItem('accessToken', loginResponse.accessToken);
                localStorage.setItem('refreshToken', loginResponse.refreshToken);
                localStorage.setItem('expires_in', loginResponse.expires_in);
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
