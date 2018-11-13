import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../services/user.service';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { SnackBarService } from '../services/snackbar.service';

@NgModule({
  imports:      [CommonModule, MatSnackBarModule],
  declarations: [],
  exports:      [],
  providers:    [
    UserService,
    SnackBarService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000, verticalPosition: 'bottom', horizontalPosition: 'right' } }
  ]
})
export class SharedModule { }
