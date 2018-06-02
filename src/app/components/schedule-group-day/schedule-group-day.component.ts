import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { ScheduleService } from '../../schedule.service';
import { CookieService } from 'ngx-cookie-service';

import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { IDailySchedule } from '../../models/IDailySchedule';
import { IGroup } from '../../models/IGroup';
import { ICurrentWeek } from '../../models/ICurrentWeek';

@Component({
  selector: 'app-schedule-group-day',
  templateUrl: './schedule-group-day.component.html',
  styleUrls: ['./schedule-group-day.component.css']
})
export class ScheduleGroupDayComponent implements OnInit {

  options = [
    { id: '0', day: 'Понедельник' },
    { id: '1', day: 'Вторник' },
    { id: '2', day: 'Среда' },
    { id: '3', day: 'Четверг' },
    { id: '4', day: 'Пятница' },
    { id: '5', day: 'Суббота' }
  ];

  parity = [
    { value: 'even', valueView: 'Чётная' },
    { value: 'odd', valueView: 'Нечётная' }
  ];

  schedule : IDailySchedule;
  groupList : IGroup[];
  currentWeek: ICurrentWeek;

  scheduleForms : FormGroup;

  constructor(
    private scheduleService : ScheduleService,
    private cookieService: CookieService,
    private formbuilder: FormBuilder) {

     }


  ngOnInit(): void {
    this.initGroupWeek();
    this.initForm();
  }

  initGroupWeek() {
    this.scheduleService.getListGroup().subscribe(response => this.groupList = response)
    this.scheduleService.getCurrentWeek().subscribe(response => {
      this.currentWeek = response;
      this.scheduleForms.controls['parityWeek'].setValue(this.currentWeek.statusParity.split(" ")[0] == 'Чётная' ? 'even' : 'odd' );
    })
  }

  initForm() {
    let currentDay = new Date().getDay() == 0 ? '0' : (new Date().getDay() - 1).toString(); // Если сегодня воскресение, то показываем за понедельник
    this.scheduleForms = this.formbuilder.group({
      group: [+this.cookieService.get('ScheduleEACA_Group'), [Validators.required]],
      day: [currentDay],
      parityWeek: [null]
    });
  }

  loadSchedule() {
    this.scheduleService.getDayScheduleGroup(this.getFormValue('parityWeek'), this.getFormValue('group'), this.getFormValue('day'))
      .subscribe(response => {
        this.schedule = response;
        console.log(this.schedule);
      });
    this.cookieService.set("ScheduleEACA_Group", this.getFormValue('group'));
  }

  getFormValue(control: string) {
    return this.scheduleForms.controls[control].value
  }

}
