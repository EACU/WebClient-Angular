import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICurrentWeek } from '../models/ICurrentWeek';
import { CookieService } from 'ngx-cookie-service';
import { ScheduleService } from '../schedule.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-schedule-toolbar',
  templateUrl: './schedule-toolbar.component.html',
  styleUrls: ['./schedule-toolbar.component.css']
})
export class ScheduleToolbarComponent implements OnInit, OnDestroy  {

  userGroup: string;
  currentWeek: ICurrentWeek;

  status: boolean;
  subscription: Subscription;

  constructor(
    private cookieService: CookieService,
    private scheduleService: ScheduleService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.subscription = this.userService.authNavStatus$.subscribe(status => this.status = status);

    this.userGroup = this.cookieService.get('ScheduleEACA_Group');
    this.scheduleService.getCurrentWeek().subscribe( response => this.currentWeek = response);
  }

  logout() {
    this.userService.logout();
  }

  resetCookieGroup() {
    this.cookieService.delete('ScheduleEACA_Group');
    this.userGroup = ' ';
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
