import { Component, OnInit } from '@angular/core';
import { ICurrentWeek } from '../models/ICurrentWeek';
import { CookieService } from 'ngx-cookie-service';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit  {

  userGroup: string;
  currentWeek: ICurrentWeek;

  constructor(private cookieService: CookieService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.userGroup = this.cookieService.get('ScheduleEACA_Group');
    this.scheduleService.getCurrentWeek().subscribe( response => this.currentWeek = response);
  }

}
