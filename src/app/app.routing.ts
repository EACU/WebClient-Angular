import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ScheduleGroupComponent } from './schedule-group/schedule-group.component';
import { ScheduleGroupDayComponent } from './schedule-group-day/schedule-group-day.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'scheduleGroup', component: ScheduleGroupComponent},
    { path: 'scheduleGroupDay', component: ScheduleGroupDayComponent}
  ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
