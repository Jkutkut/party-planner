import CalendarModel from "../CalendarModel";
import UserModel from "../user/UserModel";

class Session {
    private name: string;
    private calendar: CalendarModel;
    private users: UserModel[];

    constructor(name: string, startDate: Date) {
        this.name = name;
        this.calendar = new CalendarModel(startDate);
        this.users = [];
    }

    public static fromJSON(json: any): Session {
        const { name, calendar } = json;

        const calendarModel = CalendarModel.fromJSON(calendar);

        const session = new Session(name, calendarModel.getStartDate());
        session.calendar = calendarModel;

        const users = json.users.map((user: any) => UserModel.fromJSON(user));
        session.users = users;

        return session;
    }

    public getName(): string {
        return this.name;
    }

    public getCalendar(): CalendarModel {
        return this.calendar;
    }

    public getUsers(): UserModel[] {
        return this.users;
    }
}

export default Session;