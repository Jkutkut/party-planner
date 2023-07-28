import DayModel from "./CalendarDayModel";
import Model from "../Model";

class CalendarModel extends Model {
    private startDate: Date;
    private days: DayModel[];

    constructor(startDate: Date) {
        super();
        this.startDate = mondayOf(startDate);
        this.days = [];
    }

    public static fromJSON(json: any): CalendarModel {
        this.debug("Loading calendar from JSON", json);
        const { startDate } = json;
        const date = new Date(startDate);
        const calendar = new CalendarModel(date);
        this.debug("Calendar object created", calendar);
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

    // -----------------------------

    public toJSON(): any {
        let result: any = {};
        for (let x in this) {
            if (x === "days")
                continue;
            result[x] = this[x];
        }
        return result;
    }
};

const mondayOf = (date: Date): Date => {
    const day = date.getDay();
    const dayDiff = date.getDate() - day + (day === 0 ? -6 : 1);
    date.setDate(dayDiff);
    return new Date(date);
}

export default CalendarModel;