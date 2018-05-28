import { Component, OnInit, Input } from '@angular/core';

import { ScheduleService } from '../../schedule.service';
import { CookieService } from 'ngx-cookie-service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISchedule } from '../../models/ISchedule';
import { IGroup } from '../../models/IGroup';

@Component({
  selector: 'app-schedule-group',
  templateUrl: './schedule-group.component.html',
  styleUrls: ['./schedule-group.component.css']
})

export class ScheduleGroupComponent implements OnInit {

  scheduleForms : FormGroup;

  schedules : ISchedule[] = [];
  groupList : IGroup[] = [];

  week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  
  parity = [
    { value: 'even', valueView: 'Чётная' },
    { value: 'odd', valueView: 'Нечётная' }
  ];

  constructor(
    private scheduleService : ScheduleService,
    private cookieService: CookieService,
    private formbuilder: FormBuilder) {

     }


  ngOnInit(): void {
    this.initForm();
    this.initGroupList();
  }

  initForm() {
    this.scheduleForms = this.formbuilder.group({
      group: [+this.cookieService.get('ScheduleEACA_Group'), [Validators.required]],
      parityWeek: ['even']
    });
  }

  initGroupList() {
    this.scheduleService.getListGroup()
      .subscribe(response => { this.groupList = response;
    });
  }

  loadSchedule() {
    this.scheduleService.getWeekScheduleGroup(this.getFormValue('parityWeek'), this.getFormValue('group'))
      .subscribe(response => this.schedules = response);

    this.cookieService.set("ScheduleEACA_Group", this.getFormValue('group'));
  }

  getFormValue(control: string) {
    return this.scheduleForms.controls[control].value
  }
}
