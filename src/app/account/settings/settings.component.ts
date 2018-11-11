import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/shared/models/user.information.interface';
import { UserService } from 'src/shared/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUpdateUserViewModel } from '../viewModels/updateUserViewModel.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  currentUser: IUser;

  userSettingForm: FormGroup;
  errors: string[];

  constructor(private userService: UserService, private _formBuilder: FormBuilder) {
    this.userService.currentUser$.subscribe(user => this.currentUser = user);
  }

  // TODO: Fix bug: Если рефрешнуть страницу на этой странице, поля не инициализируются.
  ngOnInit() {
    this.userSettingForm = this._formBuilder.group({
      FirstName: [this.currentUser.firstName, Validators.required],
      LastName: [this.currentUser.lastName, Validators.required],
      Phone: [this.currentUser.phoneNumber, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      PictureUrl: [this.currentUser.pictureUrl]
    });
  }

  updateUserInformation() {
    const user: IUpdateUserViewModel = {
      firstName: this.userSettingForm.value.FirstName,
      lastName: this.userSettingForm.value.LastName,
      phoneNumber: this.userSettingForm.value.Phone,
      pictureUrl: this.userSettingForm.value.PictureUrl
    };
    this.userService.updateApiUserInformation(user)
      .subscribe(responseUser => {
        if (responseUser) {
          this.userService.setCurrentUser(responseUser);
        }},
        errors => this.errors = errors
      );
  }

}
