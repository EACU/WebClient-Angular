import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/shared/models/user.information.interface';
import { UserService } from 'src/shared/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUpdateUserViewModel } from '../viewModels/updateUserViewModel.interface';
import { SnackBarService } from 'src/shared/services/snackbar.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  currentUser: IUser;

  userSettingForm: FormGroup;

  isRequesting = false;
  errors: string[];

  constructor(private userService: UserService, private _formBuilder: FormBuilder, private toasterService: SnackBarService) {
    this.userService.currentUser$.subscribe(user => this.currentUser = user);
  }

  // TODO: Fix bug: Если обновить страницу на этой вкладке, поля не инициализируются.
  ngOnInit() {
    this.userSettingForm = this._formBuilder.group({
      FirstName: [this.currentUser.firstName, Validators.required],
      LastName: [this.currentUser.lastName, Validators.required],
      Phone: [this.currentUser.phoneNumber, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      PictureUrl: [this.currentUser.pictureUrl]
    });
  }

  updateUserInformation() {
    this.isRequesting = true;
    const user: IUpdateUserViewModel = {
      firstName: this.userSettingForm.value.FirstName,
      lastName: this.userSettingForm.value.LastName,
      phoneNumber: this.userSettingForm.value.Phone,
      pictureUrl: this.userSettingForm.value.PictureUrl
    };
    this.userService.updateApiUserInformation(user)
      .pipe(finalize(() => this.isRequesting = false))
      .subscribe(responseUser => {
        if (responseUser) {
          this.userService.setCurrentUser(responseUser);
          this.toasterService.showSuccess('Данные успешно обновленны');
        }},
        errors => this.errors = errors
      );
  }

}
