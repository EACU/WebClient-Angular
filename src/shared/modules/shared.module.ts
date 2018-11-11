import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFocusDirective } from '../../app/directive/focus.directive';
import { UserService } from '../services/user.service';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { SnackBarService } from '../services/snackbar.service';

@NgModule({
  imports:      [CommonModule, MatSnackBarModule],
  declarations: [MyFocusDirective],
  exports:      [MyFocusDirective],
  providers:    [
    UserService,
    SnackBarService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000, verticalPosition: 'bottom', horizontalPosition: 'right' } }
  ]
})
export class SharedModule { }
