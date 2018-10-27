import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpClient,
    HttpErrorResponse,
    HttpHeaderResponse,
    HttpSentEvent,
    HttpProgressEvent,
    HttpResponse,
    HttpUserEvent
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { switchMap, catchError, finalize, filter, take } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { ConfigService } from '../utils/config.service';
import { AuthService } from 'src/app/account/services/auth.service';
import { IUserTokens } from '../models/user.tokens.interface';
import { BaseService } from '../services/base.service';
import { nextTick } from 'q';

@Injectable()
export class AuthInterceptor extends BaseService implements HttpInterceptor {

    baseUrl: string;
    isRefreshingToken = false;
    tokenSubject = new BehaviorSubject<string>(null);

    constructor(
        private router: Router,
        private configService: ConfigService,
        private userService: UserService,
        private authService: AuthService) {
            super();
            this.baseUrl = this.configService.getApiURI();
        }


    addTokenInHeaders(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }});
    }

    // tslint:disable-next-line:max-line-length
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {
        return next.handle(this.addTokenInHeaders(req, this.userService.getAuthenticationToken())).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>err).status) {
                        case 400:
                            return this.handle400Error(err);
                        case 401:
                            return this.handle401Error(req, next);
                        case 403:
                            return this.handle403Error();
                    }
                } else {
                    return throwError(err);
                }
            })
        );
    }

    handle400Error(err) {
        return this.handleError(err);
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {

        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            this.tokenSubject.next(null);

            return this.userService.getRefreshToken().pipe(
                switchMap((userTokens: IUserTokens) => {
                    if (userTokens) {
                        this.tokenSubject.next(userTokens.accessToken);
                        localStorage.setItem('accessToken', userTokens.accessToken);
                        localStorage.setItem('refreshToken', userTokens.refreshToken);
                        localStorage.setItem('expires_in', userTokens.expires_in);
                        return next.handle(this.addTokenInHeaders(req, userTokens.accessToken));
                    }
                    return <any>this.authService.logout();
                }),
                catchError(() => {
                    this.router.navigate(['/authentication/login']);
                    return <any>this.authService.logout();
                }),
                finalize(() => {
                    this.isRefreshingToken = false;
                }), );
        } else {
            return this.tokenSubject.pipe(
                    filter(token => token != null),
                    take(1),
                    switchMap(token => next.handle(this.addTokenInHeaders(req, token))));
        }
    }

    handle403Error() {
        this.authService.logout();
        return this.router.navigate(['/forbidden']);
    }

}
