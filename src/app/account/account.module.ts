import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';

import { routing } from './account.routing';

import { UserService } from '../../shared/services/user.service';

import { SharedModule } from '../../shared/modules/shared.module';

import { EmailValidatorDirective } from '../directive/email.validator.directive';
import { ConfigService } from '../../shared/utils/config.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RootComponent } from './root/root.component';
import { MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    SharedModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [
    RegistrationFormComponent,
    EmailValidatorDirective,
    LoginFormComponent,
    ToolbarComponent,
    RootComponent,
  ],
  providers: [ UserService, ConfigService ]
})
export class AccountModule { }
