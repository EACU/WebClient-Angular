import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ISchedule } from './models/ISchedule';
import { IGroup } from './models/IGroup';
import { ICurrentWeek } from './models/ICurrentWeek';
import { IDailySchedule } from './models/IDailySchedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  requestUrl = 'https://eaca.azurewebsites.net/api/schedule';

  currentWeek: ICurrentWeek;

  constructor(private http: HttpClient) { }

  getCurrentWeek() {
    return this.http.get<ICurrentWeek>(`${this.requestUrl}/getParityToday`);
  }

  getWeekScheduleGroup(parity, groupId) {
    return this.http.get<ISchedule>(`${this.requestUrl}/${parity}/${groupId}`);
  }

  getDayScheduleGroup(parity, groupId, day) {
    return this.http.get<IDailySchedule>(`${this.requestUrl}/${parity}/${groupId}/${day}`);
  }

  getListGroup() {
    return this.http.get<IGroup[]>(`${this.requestUrl}/getGroupList`);
  }

}
