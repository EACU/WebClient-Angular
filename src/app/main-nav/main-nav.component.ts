import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/account/services/auth.service';
import { UserService } from 'src/shared/services/user.service';
import { SidenavService } from 'src/shared/services/sidenav.service';

import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private authService: AuthService , private userService: UserService, private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  isRoleMatch(role: string): boolean {
    return this.userService.isMatchRole(role);
  }

}

