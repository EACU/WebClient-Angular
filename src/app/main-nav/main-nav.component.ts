import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { UserService } from 'src/shared/services/user.service';
import { SidenavService } from 'src/shared/services/sidenav.service';

import { MatSidenav } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') public sidenav: MatSidenav;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private userService: UserService,
    private sidenavService: SidenavService) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  isLogged(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  isMatchRole(role: string): boolean {
    return this.userService.isMatchRoleUser(role);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

