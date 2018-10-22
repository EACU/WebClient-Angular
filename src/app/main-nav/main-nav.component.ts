import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/shared/services/auth.service';
import { UserInformation } from 'src/shared/models/userInformation.interface';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {

  userInformation: UserInformation;
  adminStatus: boolean;
  studentStatus: boolean;
  status: boolean;
  subscription: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService , private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.authService.authNavStatus$.subscribe(status => this.status = status);
    if (localStorage.getItem('auth_token')) {
      this.userService.userInformation().subscribe(response => this.userInformation = response);
    }
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

