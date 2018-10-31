import { Component, OnInit } from '@angular/core';

import { ScheduleService } from '../services/schedule.service';
import { CookieService } from 'ngx-cookie-service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISchedule } from '../models/ISchedule';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})

export class GroupComponent implements OnInit {

  schedule: ISchedule;
  scheduleForms: FormGroup;

  isRequesting = false;
  errors: string;

  parity = [
    { value: 'even', valueView: 'Чётная' },
    { value: 'odd', valueView: 'Нечётная' }
  ];

  constructor(
    private scheduleService: ScheduleService,
    private cookieService: CookieService,
    private formbuilder: FormBuilder) {

     }

  ngOnInit(): void {
    this.initForm();
    this.initSchedule();
  }

  initForm() {
    this.scheduleForms = this.formbuilder.group({
      group: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
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
    this.scheduleService.getWeekScheduleGroup(this.getFormValue('parityWeek'), this.getFormValue('group'))
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

  getFormValue(control: string) {
    return this.scheduleForms.controls[control].value;
  }
}
