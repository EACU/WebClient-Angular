import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ISchedule } from '../models/ISchedule';
import { IGroup } from '../models/IGroup';
import { ICurrentWeek } from '../models/ICurrentWeek';
import { IDailySchedule } from '../models/IDailySchedule';
import { BaseService } from '../../../shared/services/base.service';
import { ConfigService } from 'src/shared/utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends BaseService {

  baseUrl = '';

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.baseUrl = this.configService.getApiURI() + '/schedule';
   }

  getCurrentWeek() {
    return this.http.get<ICurrentWeek>(`${this.baseUrl}/getParityToday`);
  }

  getWeekScheduleGroup(parity, groupId) {
    return this.http.get<ISchedule>(`${this.baseUrl}/${groupId}/${parity}`);
  }

  getDayScheduleGroup(parity, groupId, day) {
    return this.http.get<IDailySchedule>(`${this.baseUrl}/${groupId}/${parity}/${day}`);
  }

  getListGroup() {
    return this.http.get<IGroup[]>(`${this.baseUrl}/getGroupList`);
  }

}
