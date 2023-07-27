import CalendarModel from "../CalendarModel";

class Session {
    private name: string;
    private calendar: CalendarModel;

    constructor(name: string, startDate: Date) {
        this.name = name;
        this.calendar = new CalendarModel(startDate);
    }

    public static fromJSON(json: any): Session {
        const { name, calendar } = json;

        const calendarModel = CalendarModel.fromJSON(calendar);

        const session = new Session(name, calendarModel.getStartDate());
        session.calendar = calendarModel;
        return session;
    }

    public getName(): string {
        return this.name;
    }

    public getCalendar(): CalendarModel {
        return this.calendar;
    }
}

export default Session;