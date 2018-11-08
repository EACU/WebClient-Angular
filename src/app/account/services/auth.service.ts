import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { StudentRegistrationViewModel } from '../models/RegistationViewModels/student.registration';
import { ConfigService } from '../../../shared/utils/config.service';

import { BaseService } from '../../../shared/services/base.service';
import { BehaviorSubject, Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { ILoginResponse } from '../models/loginResponse.interface';
import { IUserTokens } from 'src/shared/models/user.tokens.interface';
import { IUser } from 'src/shared/models/user.information.interface';
import { UserService } from 'src/shared/services/user.service';

@Injectable()
export class AuthService extends BaseService {

    private baseUrl: string;

    constructor(private http: HttpClient, private configService: ConfigService, private userService: UserService) {
        super();
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
                this.userService.getApiUserInformation().subscribe(user => this.userService.setCurrentUser(user));
                return true;
            })
        );
    }

    getRefreshToken(): Observable<IUserTokens> {
        const refreshToken = localStorage.getItem('refreshToken');
        const body = JSON.stringify({ token: refreshToken });
        const httpOptions = {headers: new HttpHeaders({ 'Content-Type':  'application/json' })};
        return this.http.post<IUserTokens>(this.baseUrl + '/token/refresh', body, httpOptions).pipe(catchError(this.handleError));
    }

    logout() {
        localStorage.clear();
        this.userService.setCurrentUser(null);
    }
}
