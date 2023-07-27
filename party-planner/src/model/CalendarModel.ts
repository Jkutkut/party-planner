import DayModel from "./CalendarDayModel";

class CalendarModel {
    private startDate: Date;
    private days: DayModel[];

    constructor(startDate: Date) {
        this.startDate = mondayOf(startDate);
        this.days = [];
    }

    public static fromJSON(json: any): CalendarModel {
        const { startDate, days } = json;

        const date = new Date(startDate);
        const daysModel = days.map((day: any) => DayModel.fromJSON(day));

        const calendar = new CalendarModel(date);
        calendar.days = daysModel;
        return calendar;
    }

    public async loadDays(): Promise<CalendarModel> {
        const offset = this.days.length;
        const oneDay = 24 * 60 * 60 * 1000;

        let newDate: Date;
        const newDays: DayModel[] = []; 
        for (let i = 0; i < 7; i++) {
            newDate = new Date(this.startDate.getTime() + (i + offset) * oneDay);
            newDays.push(new DayModel(newDate));
        }
        this.days = [...this.days, ...newDays];
        return new Promise((resolve) => resolve(this));
    }

    public getDays(): DayModel[] {
        return this.days;
    }

    public getStartDate(): Date {
        return this.startDate;
    }
}

const mondayOf = (date: Date): Date => {
    const day = date.getDay();
    const dayDiff = date.getDate() - day + (day === 0 ? -6 : 1);
    date.setDate(dayDiff);
    return new Date(date);
}

export default CalendarModel;