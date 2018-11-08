import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from 'src/shared/services/sidenav.service';
import { UserDetails } from 'src/shared/models/user.information.interface';
import { UserService } from 'src/shared/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../account/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit, OnDestroy {

  isLoggin: boolean;
  subscription: Subscription;

  currentUser: UserDetails;

  constructor(private authService: AuthService , private userService: UserService, private sidenavService: SidenavService) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.subscription = this.authService.authNavStatus$.subscribe(status => this.isLoggin = status);
  }

  public toggleSidenav() {
    this.sidenavService.toggle();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
