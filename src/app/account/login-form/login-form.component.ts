import { Component } from '@angular/core';
import { Credentials } from '../../../shared/models/credentials.interface';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  credentials: Credentials = { email: '', password: '' };
  isRequesting = false;
  submitted = false;
  errors: string;

  constructor(private userService: UserService, private router: Router) { }


  login({ value, valid }: { value: Credentials, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.login(value.email, value.password)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['/']);
            }
          },
          error => this.errors = error
        );
    }
  }

}
