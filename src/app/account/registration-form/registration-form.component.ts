import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StudentRegistrationViewModel } from '../models/student.registration.interface';

import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  errors: string[];
  isRequesting: boolean;
  submitted = false;

  constructor(private authService: AuthService, private router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Phone: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]]
    });
    this.secondFormGroup = this._formBuilder.group({
      Group: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      Gradebook: ['', Validators.required],
      Headman: ['', Validators.required]
    });
  }

  done() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const student: StudentRegistrationViewModel = {
        email: this.firstFormGroup.value.Email,
        password: this.firstFormGroup.value.Password,
        firstName: this.firstFormGroup.value.FirstName,
        lastName: this.firstFormGroup.value.LastName,
        phoneNumber: this.firstFormGroup.value.Phone,
        group: this.secondFormGroup.value.Group,
        gradebook: this.secondFormGroup.value.Gradebook,
        headman: this.secondFormGroup.value.Headman
      };
      this.registerUser(student);
    }
  }

  registerUser(student) {
    this.submitted = true;
    this.isRequesting = true;
    this.authService.registerStudent(student)
      .pipe(finalize(() => this.isRequesting = false))
      .subscribe(result => {
          if (result) {
            console.log(result);
            this.router.navigate(['/authentication/login']);
          }},
        errors => this.errors = errors
      );
 }
}
