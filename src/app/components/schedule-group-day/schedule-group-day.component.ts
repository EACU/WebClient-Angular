import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { ScheduleService } from '../../schedule.service';
import { CookieService } from 'ngx-cookie-service';

import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ISchedule } from '../../models/ISchedule';

@Component({
  selector: 'app-schedule-group-day',
  templateUrl: './schedule-group-day.component.html',
  styleUrls: ['./schedule-group-day.component.css']
})
export class ScheduleGroupDayComponent implements OnInit {

  displayedColumns = ['time', 'lesson'];

  options = [
    { id: '0', day: 'Понедельник' },
    { id: '1', day: 'Вторник' },
    { id: '2', day: 'Среда' },
    { id: '3', day: 'Четверг' },
    { id: '4', day: 'Пятница' },
    { id: '5', day: 'Суббота' }
  ];

  parity = [
    { value: 'Even', valueView: 'Чётная' },
    { value: 'Odd', valueView: 'Нечётная' }
  ];

  schedule : ISchedule;

  scheduleForms : FormGroup;

  constructor(
    private scheduleService : ScheduleService,
    private cookieService: CookieService,
    private formbuilder: FormBuilder) {

     }


  ngOnInit(): void {
    this.initForm();
    // if (this.scheduleForms.valid)
    //   this.loadSchedule()
  }

  initForm() {
    let currentDay = new Date().getDay() == 0 ? '0' : (new Date().getDate() - 1).toString(); // Если сегодня воскресение, то показываем за понедельник
    this.scheduleForms = this.formbuilder.group({
      group: [this.cookieService.get('ScheduleEACA_Group'), [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      day: [currentDay],
      parityWeek: [null]
    });
  }

  loadSchedule() {
    this.scheduleService.getDayScheduleGroup(this.getFormValue('parityWeek'), this.getFormValue('group'), this.getFormValue('day'))
      .subscribe(response => this.schedule = response);
    this.cookieService.set("ScheduleEACA_Group", this.getFormValue('group'));
  }

  getFormValue(control: string) {
    return this.scheduleForms.controls[control].value
  }

}
