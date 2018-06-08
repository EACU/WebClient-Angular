import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ScheduleGroupComponent } from './schedule-group/schedule-group.component';
import { ScheduleGroupDayComponent } from './schedule-group-day/schedule-group-day.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
import { ScheduleToolbarComponent } from './schedule-toolbar/schedule-toolbar.component';
import { AccountModule } from './account/account.module';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScheduleGroupComponent,
    ScheduleGroupDayComponent,
    ScheduleToolbarComponent
  ],
  imports: [
    AccountModule,
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
    MatSidenavModule,
    MatListModule,
    routing,
    LayoutModule
  ],
  providers: [
    ScheduleService,
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
