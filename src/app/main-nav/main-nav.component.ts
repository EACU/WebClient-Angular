import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/account/services/auth.service';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {

  status: boolean;
  subscription: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService , private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.authService.authNavStatus$.subscribe(status => this.status = status);
  }

  isRoleMatch(role: string): boolean {
    return this.userService.isMatchRole(role);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

