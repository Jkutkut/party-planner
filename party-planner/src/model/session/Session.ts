import Model from "../Model";
import CalendarModel from "../calendar/CalendarModel";
import UserModel from "../user/UserModel";
import SessionHandler from "./SessionHandler";

class Session extends Model {
    private name: string;
    private calendar: CalendarModel;
    private users: UserModel[];
    private currentUserIdx: number;

    constructor(name: string, startDate: Date) {
        super();
        this.name = name;
        this.calendar = new CalendarModel(startDate);
        this.users = [];
        this.currentUserIdx = -1;
    }

    public static fromJSON(json: any): Session {
        this.debug("Loading session from JSON", json);
        const { name, calendar } = json;
        this.debug("Name:", name);
        this.debug("Calendar:", calendar);
        const calendarModel = CalendarModel.fromJSON(calendar);
        this.debug("CalendarModel:", calendarModel);
        const session = new Session(name, calendarModel.getStartDate());
        session.calendar = calendarModel;
        this.debug("Session object created");
        const users = json.users.map((user: any) => UserModel.fromJSON(user));
        session.users = users;
        this.debug("Users:", users);
        session.currentUserIdx = json.currentUserIdx;
        this.debug("Current user index:", session.currentUserIdx);
        this.debug("Session object created", session);
        return session;
    }

    public addUser(user: UserModel): void {
        // ! Not doing input validation
        this.users.push(user);
        SessionHandler.getInstance().saveSessions();
    }

    public setCurrentUserIdx(idx: number): void {
        // ! Not doing input validation
        this.currentUserIdx = idx;
        SessionHandler.getInstance().saveSessions();
    }

    public removeUser(userIdx: number): void {
        // ! Not doing input validation
        this.getCalendar().removeUser(userIdx);
        this.users = [...this.users.slice(0, userIdx), ...this.users.slice(userIdx + 1)]
        if (userIdx === this.currentUserIdx)
            this.currentUserIdx = -1;
        else if (userIdx < this.currentUserIdx)
            this.currentUserIdx--;
        SessionHandler.getInstance().saveSessions();
    }


    // -------------------------

    public getName(): string {
        return this.name;
    }

    public getCalendar(): CalendarModel {
        return this.calendar;
    }

    public getUsers(): UserModel[] {
        return this.users.slice();
    }

    public getCurrentUserIdx(): number {
        return this.currentUserIdx;
    }
}

export default Session;