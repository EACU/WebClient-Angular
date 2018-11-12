import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatIconModule,
  MatCardModule, MatButtonModule, MatDividerModule, MatMenuModule, MatDialogModule
} from '@angular/material';

import { LayoutModule } from '@angular/cdk/layout';
import { AccountModule } from './account/account.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AdminPanelModule } from './admin-panel/admin-panel.module';

import { ScheduleService } from './schedule/services/schedule.service';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from './app.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';

import { AuthInterceptor } from 'src/shared/interceptors/auth.interceptor';

import { routing } from './app.routing';
import { SidenavService } from 'src/shared/services/sidenav.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    ForbiddenComponent,
    MainHeaderComponent,
    MainFooterComponent
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
    MatDividerModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [
    ScheduleService,
    CookieService,
    AppService,
    SidenavService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
