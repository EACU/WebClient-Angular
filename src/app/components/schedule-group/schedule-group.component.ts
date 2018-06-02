import { Component, OnInit, Input } from '@angular/core';

import { ScheduleService } from '../../schedule.service';
import { CookieService } from 'ngx-cookie-service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISchedule } from '../../models/ISchedule';
import { IGroup } from '../../models/IGroup';
import { Observable } from 'rxjs';
import { ICurrentWeek } from '../../models/ICurrentWeek';

@Component({
  selector: 'app-schedule-group',
  templateUrl: './schedule-group.component.html',
  styleUrls: ['./schedule-group.component.css']
})

export class ScheduleGroupComponent implements OnInit {

  scheduleForms : FormGroup;

  schedule : ISchedule;
  groupList : IGroup[];
  currentWeek: ICurrentWeek;

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
    this.initGroupWeek();
    this.initForm();
  }

  initForm() {
    this.scheduleForms = this.formbuilder.group({
      group: [+this.cookieService.get('ScheduleEACA_Group'), [Validators.required]],
      parityWeek: [null]
    });
  }

  initGroupWeek() {
    this.scheduleService.getListGroup().subscribe(response => this.groupList = response)
    this.scheduleService.getCurrentWeek().subscribe(response => {
      this.currentWeek = response;
      this.scheduleForms.controls['parityWeek'].setValue(this.currentWeek.statusParity.split(" ")[0] == 'Чётная' ? 'even' : 'odd' );
    })
  }

  loadSchedule() {
    this.scheduleService.getWeekScheduleGroup(this.getFormValue('parityWeek'), this.getFormValue('group'))
      .subscribe(response => this.schedule = response);

    this.cookieService.set("ScheduleEACA_Group", this.getFormValue('group'));
  }

  getFormValue(control: string) {
    return this.scheduleForms.controls[control].value
  }
}
