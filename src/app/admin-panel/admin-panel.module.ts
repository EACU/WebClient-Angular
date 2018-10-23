import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../auth.guard';
import { routing } from './admin-panel.routing';
import { SharedModule } from '../../shared/modules/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AdminService } from './services/admin.service';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    routing,
    SharedModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  declarations: [RootComponent, HomeComponent, ToolbarComponent],
  exports: [ ],
  providers: [AuthGuard, AdminService]
})
export class AdminPanelModule { }
