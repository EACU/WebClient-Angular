import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RootComponent } from './root/root.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'authentication',
    component: RootComponent,

    children: [
      { path: 'register', component: RegistrationFormComponent},
      { path: 'login', component: LoginFormComponent}
    ]
  }
]);
