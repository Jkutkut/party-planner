import SessionHandler from "../session/SessionHandler";

class CalendarDayModel {
    private date: Date;
    private dateString: string | undefined;
    private users: number[];

    constructor(date: Date) {
        this.date = date;
        this.users = [];
    }

    public static fromJSON(json: any): CalendarDayModel {
        const { date, users } = json;
        const calendarDayModel = new CalendarDayModel(new Date(date));
        calendarDayModel.users = users;
        return calendarDayModel;
    }

    public getUsers(): number[] {
        return this.users;
    }

    public toggleUser(userId: number): void {
        if (this.users.indexOf(userId) === -1) {
            this.users.push(userId);
        }
        else {
            this.users = this.users.filter((user) => user !== userId);
        }
        SessionHandler.getInstance().saveSessions();
    }

    protected setDate(date: Date): void {
        this.date = date;
    }

    public getDate(): Date {
        return this.date;
    }

    public toString(): string {
        if (this.dateString === undefined) {
            this.dateString = this.date.toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        }
        return this.dateString;
    }
}

export default CalendarDayModel;