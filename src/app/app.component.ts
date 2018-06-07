import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { CookieService } from 'ngx-cookie-service';
import { ScheduleService } from './schedule.service';
import { ICurrentWeek } from './models/ICurrentWeek';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  userGroup: string;
  currentWeek: ICurrentWeek;

  constructor(private cookieService: CookieService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.userGroup = this.cookieService.get('ScheduleEACA_Group');
    this.scheduleService.getCurrentWeek().subscribe( response => {
      this.currentWeek = response;
    });
  }

}
