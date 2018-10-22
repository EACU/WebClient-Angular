import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'forbidden', component: ForbiddenComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
