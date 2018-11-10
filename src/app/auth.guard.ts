import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/shared/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const role = next.data['role'] as string;
      if (this.userService.isMatchRoleUser(role)) {
        return true;
      } else {
        this.router.navigate(['/forbidden']);
        return false;
      }
    }
    this.router.navigate(['/authentication/login']);
    return false;
  }
}
