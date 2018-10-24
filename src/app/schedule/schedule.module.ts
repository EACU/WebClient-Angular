import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatTooltipModule,
  MatMenuModule,
  MatFormFieldModule,
  MatRadioModule,
  MatProgressBarModule,
  MatTableModule,
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
} from '@angular/material';

import { HomeComponent } from './home/home.component';
import { RootComponent } from './root/root.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { GroupComponent } from './group/group.component';
import { GroupDayComponent } from './group-day/group-day.component';

import { routing } from './schedule.routing';
import { AuthService } from '../account/services/auth.service';
import { UserService } from 'src/shared/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    routing,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatProgressBarModule,
    MatTableModule,
    MatSelectModule,
    MatCardModule,
  ],
  declarations: [
    HomeComponent,
    RootComponent,
    ToolbarComponent,
    GroupComponent,
    GroupDayComponent
  ],
  providers: [AuthService , UserService]
})
export class ScheduleModule { }
