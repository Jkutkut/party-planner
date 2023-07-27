import CalendarModel from "../CalendarModel";

class Session {
    private name: string;
    private calendar: CalendarModel;

    constructor(name: string, startDate: Date) {
        this.name = name;
        this.calendar = new CalendarModel(startDate);
    }

    public getName(): string {
        return this.name;
    }

    public getCalendar(): CalendarModel {
        return this.calendar;
    }
}

export default Session;