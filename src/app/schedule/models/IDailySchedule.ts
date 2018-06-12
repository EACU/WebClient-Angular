export interface IDailySchedule {
    day: string;
    lessons: ILesson[];
}

interface ILesson {
    time: string;
    lessonName: string;
}
