import { IDailySchedule } from "./IDailySchedule";

export interface ISchedule {
    groupId: string;
    parity: string;
    dateQuery: string;
    weekSchedule : IDailySchedule[];
}