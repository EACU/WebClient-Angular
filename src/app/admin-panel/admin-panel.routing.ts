import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from '../auth.guard';

export const routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin',
    component: RootComponent, canActivate: [AuthGuard],
    data: { role: ['api_access_admin'] },
    children: [
      { path: '', component: HomeComponent },
      { path: 'home',  component: HomeComponent },
    ]
  }
]);
