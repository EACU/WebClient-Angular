import { Component, OnInit, ViewChild } from '@angular/core';

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

  constructor(private userService: UserService, private sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  isLogged(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  isMatchRole(role: string): boolean {
    return this.userService.isMatchRoleUser(role);
  }

}

