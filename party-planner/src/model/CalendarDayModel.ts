class CalendarDayModel {
    private date: Date;
    // private people: User[];
    private dateString: string | undefined;

    constructor(date: Date) {
        this.date = date;
    }

    protected setDate(date: Date): void {
        this.date = date;
    }

    protected getDate(): Date {
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