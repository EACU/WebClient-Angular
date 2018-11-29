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
  MatListModule,
  MatProgressSpinnerModule,
  MatTabsModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../auth.guard';
import { routing } from './admin-panel.routing';
import { SharedModule } from '../../shared/modules/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AdminService } from './services/admin.service';
import { UserOperationsComponent } from './user-operations/user-operations.component';

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
    MatListModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  declarations: [RootComponent, HomeComponent, ToolbarComponent, UserOperationsComponent],
  exports: [ ],
  providers: [AuthGuard, AdminService]
})
export class AdminPanelModule { }
