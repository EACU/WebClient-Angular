import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private userService: UserService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedreq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + this.userService.getToken() )});
        return next.handle(clonedreq).pipe(tap(
            succ => { },
            err => {
                console.log(err);
                if (err.status === 401) {
                    this.router.navigate(['/authentication/login']);
                }
                if (err.status === 403) {
                    this.router.navigate(['/forbidden']);
                }
            }
        ));
    }
}
