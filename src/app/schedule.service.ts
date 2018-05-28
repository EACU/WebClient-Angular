import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ISchedule } from './models/ISchedule';
import { IGroup } from './models/IGroup';
import { IParityWeek } from './models/IParityWeek';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  requestUrl : string = "https://eaca.azurewebsites.net/api/schedule";

  constructor(private http : HttpClient) { }

  getWeekScheduleGroup(parity, groupId) {
    return this.http.get<ISchedule[]>(`${this.requestUrl}/${parity}/${groupId}`)
  }

  getDayScheduleGroup(parity, groupId, day) {
    return this.http.get<ISchedule>(`${this.requestUrl}/${parity}/${groupId}/${day}`);
  }

  getEvenOddWeekToday() {
    return this.http.get<IParityWeek>(`${this.requestUrl}/getEvenOddToday`);
  }

  getListGroup() {
    return this.http.get<IGroup[]>(`${this.requestUrl}/getGroupList`);
  }

}
