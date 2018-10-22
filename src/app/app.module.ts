import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatIconModule,
  MatCardModule, MatButtonModule
} from '@angular/material';

import { AccountModule } from './account/account.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ScheduleModule } from './schedule/schedule.module';

import { ScheduleService } from './schedule/services/schedule.service';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from './app.service';

import { routing } from './app.routing';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminPanelModule } from './admin-panel/admin-panel.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    ForbiddenComponent
  ],
  imports: [
    AccountModule,
    BrowserModule,
    DashboardModule,
    AdminPanelModule,
    ScheduleModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    routing,
    LayoutModule,
    MatButtonModule,
  ],
  providers: [
    ScheduleService,
    CookieService,
    AppService
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
