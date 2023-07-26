import CalendarDayModel from "../../model/CalendarDayModel";

interface Props {
    day: CalendarDayModel;
};

const CalendarDay = ({ day }: Props) => {
    return <>
        <hr />
        <h2>{day.toString()}</h2>
        <p>Event 1</p>
        <p>Event 2</p>
        <p>Event 3</p>
        <hr />
    </>;
};

export default CalendarDay;