import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from '../models/user.information.interface';

import { ConfigService } from '../utils/config.service';
import { BaseService } from './base.service';

import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUpdateUserViewModel } from 'src/app/account/viewModels/updateUserViewModel.interface';

@Injectable()
export class UserService extends BaseService {

    private baseUrl: string;

    private _currentUserSource: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
    readonly currentUser$ = this._currentUserSource.asObservable();

    constructor(private http: HttpClient, private configService: ConfigService) {
        super();
        this.baseUrl = this.configService.getApiURI();
    }

    setCurrentUser (user: IUser) {
        this._currentUserSource.next(user);
    }

    getApiUserInformation(): Observable<IUser> {
        return this.http.get<IUser>(this.baseUrl + '/account/information/').pipe(catchError(this.handleError));
    }

    updateApiUserInformation(updateUser: IUpdateUserViewModel): Observable<IUser> {
        return this.http.put<IUser>(this.baseUrl + '/account/information', updateUser).pipe(catchError(this.handleError));
    }

    isMatchRoleUser(role: string): boolean {
        if (this._currentUserSource.getValue() == null) {
            return false;
        }
        return this._currentUserSource.getValue().roles.includes(role);
    }
}
