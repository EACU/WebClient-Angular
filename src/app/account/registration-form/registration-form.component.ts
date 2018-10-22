import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { UserRegistration } from '../../../shared/models/user.registration.interface';

import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  errors: string[];
  isRequesting: boolean;
  submitted = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    if (valid) {
      this.authService.register(value.email, value.password, value.firstName, value.lastName, value.group)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe(result => {
            if (result) {
              this.router.navigate(['/authentication/login'], {queryParams: {brandNew: true, email: value.email, result: result}});
            }},
          errors => this.errors = errors
        );
    }
 }
}
