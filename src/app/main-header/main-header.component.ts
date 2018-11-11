import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/shared/services/sidenav.service';
import { IUser } from 'src/shared/models/user.information.interface';
import { UserService } from 'src/shared/services/user.service';
import { AuthService } from '../account/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  currentUser: IUser;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sidenavService: SidenavService,
    private router: Router) {

  }

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => this.currentUser = user);
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
