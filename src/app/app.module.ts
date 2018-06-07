import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ScheduleGroupComponent } from './components/schedule-group/schedule-group.component';
import { ScheduleGroupDayComponent } from './components/schedule-group-day/schedule-group-day.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {Routes, RouterModule} from '@angular/router';

import { MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatButtonModule,
  MatSelectModule,
  MatTableModule,
  MatAutocompleteModule,
  MatToolbarModule,
  MatTooltipModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule, MatSidenavModule, MatListModule, MatRadioModule, MatProgressBarModule, MatBadgeModule
} from '@angular/material';

import { ScheduleService } from './schedule.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { ScheduleToolbarComponent } from './components/schedule-toolbar/schedule-toolbar.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'scheduleGroup', component: ScheduleGroupComponent},
  { path: 'scheduleGroupDay', component: ScheduleGroupDayComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScheduleGroupComponent,
    ScheduleGroupDayComponent,
    ScheduleToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatTableModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressBarModule,
    MatBadgeModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    ScheduleService,
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
