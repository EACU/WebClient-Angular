import { Component, OnInit } from '@angular/core';

import { ScheduleService } from '../services/schedule.service';
import { CookieService } from 'ngx-cookie-service';

import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { IDailySchedule } from '../models/IDailySchedule';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-group-day',
  templateUrl: './group-day.component.html',
  styleUrls: ['./group-day.component.css']
})
export class GroupDayComponent implements OnInit {

  schedule: IDailySchedule;
  scheduleForms: FormGroup;
  currentDay: string;

  isRequesting = false;
  errors: string;

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

  constructor(
    private scheduleService: ScheduleService,
    private cookieService: CookieService,
    private formbuilder: FormBuilder) {
      this.currentDay = new Date().getDay() === 0 ? '0' : (new Date().getDay() - 1).toString();
    }


  ngOnInit(): void {
    this.initForm();
    this.initSchedule();
  }

  initForm() {
    this.scheduleForms = this.formbuilder.group({
      group: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      day: [this.currentDay, [Validators.required]],
      parityWeek: [null, [Validators.required]]
    });
  }

  initSchedule() {
    this.scheduleForms.controls['group'].setValue(this.cookieService.get('ScheduleEACA_Group'));
    this.scheduleService.getCurrentWeek().subscribe(response => {
      this.scheduleForms.controls['parityWeek'].setValue(response.statusParity);
      if (this.scheduleForms.valid) {
        this.loadSchedule();
      }
    });
  }

  loadSchedule() {
    this.errors = undefined;
    this.schedule = undefined;
    this.isRequesting = true;
    this.scheduleService.getDayScheduleGroup(this.getFormValue('parityWeek'), this.getFormValue('group'), this.getFormValue('day'))
      .pipe(finalize(() => this.isRequesting = false))
      .subscribe(
        response => {
          this.schedule = response;
        },
        error => {
          this.errors = error;
        }
      );
    this.cookieService.set('ScheduleEACA_Group', this.getFormValue('group'));
  }

  resetForm() {
    this.scheduleForms.controls['group'].setValue(null);
    this.scheduleForms.controls['day'].setValue(null);
    this.scheduleForms.controls['parityWeek'].setValue(null);
  }

  private getFormValue(control: string) {
    return this.scheduleForms.controls[control].value;
  }

}
