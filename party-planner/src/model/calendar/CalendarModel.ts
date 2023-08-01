import CalendarDayModel from "./CalendarDayModel";
import Model from "../Model";

class CalendarModel extends Model {

    protected static ONE_DAY = 24 * 60 * 60 * 1000;

    private startDate: Date;
    private days: CalendarDayModel[];

    constructor(startDate: Date) {
        super();
        this.startDate = mondayOf(startDate);
        this.days = [];
    }

    public static fromJSON(json: any): CalendarModel {
        this.debug("Loading calendar from JSON", json);
        const date = new Date(json.startDate);
        const days: CalendarDayModel[] = json.days.map((day: any) => CalendarDayModel.fromJSON(day));
        const calendar = new CalendarModel(date);

        if (days.length > 0) {
            this.debug("Importing days from JSON", days);
            const realDays: CalendarDayModel[] = [];
            let currentDay: Date = date;
            let i = 0;
            while (i < days.length) {
                const dayDate: Date = days[i].getDate();
                this.debug("\nCurrent day", currentDay, "\nDay date", dayDate);
                while (currentDay.getTime() < dayDate.getTime()) {
                    this.debug("Adding day\n", currentDay);
                    realDays.push(new CalendarDayModel(currentDay));
                    currentDay = new Date(currentDay.getTime() + CalendarModel.ONE_DAY);
                    this.debug("\nloop end:\nCurrent day", currentDay, "\nDay date", dayDate);
                }
                this.debug("\nAdding day variable", days[i]);
                realDays.push(days[i]);
                currentDay = new Date(days[i].getDate().getTime() + CalendarModel.ONE_DAY);
                i++;
            }
            while (realDays.length % 7 !== 0) {
                realDays.push(new CalendarDayModel(currentDay));
                currentDay = new Date(currentDay.getTime() + CalendarModel.ONE_DAY);
            }
            calendar.days = realDays;
            this.debug("Days imported", realDays);
        }
        this.debug("Calendar object created", calendar);
        return calendar;
    }

    public async loadDays(): Promise<CalendarModel> {
        const offset = this.days.length;

        let newDate: Date;
        const newDays: CalendarDayModel[] = []; 
        for (let i = 0; i < 15; i++) {
            newDate = new Date(this.startDate.getTime() + (i + offset) * CalendarModel.ONE_DAY);
            newDays.push(new CalendarDayModel(newDate));
        }
        this.days = [...this.days, ...newDays];
        return new Promise((resolve) => resolve(this));
    }

    public getDays(): CalendarDayModel[] {
        return this.days;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public removeUser(userIdx: number): void {
        this.days.forEach((day: CalendarDayModel) => day.removeUser(userIdx));
    }

    // -----------------------------

    public toJSON(): any {
        const result: any = {};
        for (const x in this) {
            if (x === "days") {
                result.days = this.days.filter((day: CalendarDayModel) => day.getUsers().length > 0);
                continue;
            }
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