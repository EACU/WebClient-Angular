import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { finalize } from 'rxjs/internal/operators/finalize';
import { SnackBarService } from 'src/shared/services/snackbar.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  isRequesting: boolean;
  errors: string;

  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isRequesting = true;
      this.errors = '';
      this.authService.login({username: this.loginForm.value.email, password: this.loginForm.value.password})
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe(
          () => {
            this.snackBarService.showSuccess(`Здравствуйте: ${this.loginForm.value.email}`);
            this.dialogRef.close();
          },
          error => this.errors = error
        );
    }
  }
}

