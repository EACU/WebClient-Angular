import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { GroupComponent } from './group/group.component';
import { GroupDayComponent } from './group-day/group-day.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  {
      path: 'schedule',
      component: RootComponent,

      children: [
        { path: '', component: HomeComponent},
        { path: 'group', component: GroupComponent},
        { path: 'groupDay', component: GroupDayComponent},
      ]
    }
]);
