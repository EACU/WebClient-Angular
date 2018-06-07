import { Component, OnInit } from '@angular/core';
import { ICurrentWeek } from '../../models/ICurrentWeek';
import { CookieService } from 'ngx-cookie-service';
import { ScheduleService } from '../../schedule.service';

@Component({
  selector: 'app-schedule-toolbar',
  templateUrl: './schedule-toolbar.component.html',
  styleUrls: ['./schedule-toolbar.component.css']
})
export class ScheduleToolbarComponent implements OnInit {

  userGroup: string;
  currentWeek: ICurrentWeek;

  constructor(private cookieService: CookieService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.userGroup = this.cookieService.get('ScheduleEACA_Group');
    this.scheduleService.getCurrentWeek().subscribe( response => this.currentWeek = response);
  }

  resetCookieGroup() {
    this.cookieService.delete('ScheduleEACA_Group');
    this.userGroup = ' ';
  }
}
