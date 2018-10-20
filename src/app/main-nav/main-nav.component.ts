import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/shared/services/user.service';
import { AppService } from 'src/app/app.service';
import { UserInformation } from 'src/shared/models/userInformation.interface';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {

  userDetails: UserInformation;
  status: boolean;
  subscription: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService, private appService: AppService) {}

  ngOnInit(): void {
    this.subscription = this.userService.authNavStatus$.subscribe(status => this.status = status);
    if (localStorage.getItem('auth_token')) {
      this.appService.getUserDetails().subscribe(response => this.userDetails = response);
    }
  }

  logout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

