import DayModel from "./CalendarDayModel";

class CalendarModel {
    private startDate: Date;
    private days: DayModel[];

    constructor(startDate: Date) {
        this.startDate = mondayOf(startDate);
        this.days = [];
    }

    public async loadDays(): Promise<CalendarModel> {
        const offset = this.days.length;
        const oneDay = 24 * 60 * 60 * 1000;

        let newDate: Date;
        for (let i = 0; i < 7; i++) {
            newDate = new Date(this.startDate.getTime() + (i + offset) * oneDay);
            this.days.push(new DayModel(newDate));
        }
        return new Promise((resolve) => setTimeout(() => resolve(this), 1000)); // TODO
    }

    public getDays(): DayModel[] {
        return this.days;
    }
}

const mondayOf = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}

export default CalendarModel;