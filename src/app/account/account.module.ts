import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/modules/shared.module';
import {
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressBarModule,
  MatStepperModule,
  MatIconModule,
  MatListModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule
} from '@angular/material';

import { RootComponent } from './root/root.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

import { ConfigService } from '../../shared/utils/config.service';
import { AuthService } from './services/auth.service';

import { EmailValidatorDirective } from '../directive/email.validator.directive';

import { routing } from './account.routing';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatStepperModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegistrationFormComponent,
    EmailValidatorDirective,
    LoginFormComponent,
    ToolbarComponent,
    RootComponent,
    SettingsComponent,
  ],
  providers: [ AuthService, ConfigService ]
})
export class AccountModule { }
