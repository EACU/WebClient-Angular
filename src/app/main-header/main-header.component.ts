import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/shared/services/sidenav.service';
import { IUser } from 'src/shared/models/user.information.interface';
import { UserService } from 'src/shared/services/user.service';
import { AuthService } from '../account/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginFormComponent } from '../account/login-form/login-form.component';
import { SnackBarService } from 'src/shared/services/snackbar.service';

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
    private router: Router,
    public dialog: MatDialog,
    private snackbarService: SnackBarService) {

  }

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => this.currentUser = user);
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbarService.showInfo(`Здравствуйте ${result}`);
      }
    });
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
