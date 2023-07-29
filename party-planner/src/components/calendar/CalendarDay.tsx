import { useState } from "react";
import CalendarDayModel from "../../model/calendar/CalendarDayModel";
import Session from "../../model/session/Session";

interface Props {
    day: CalendarDayModel;
    session: Session;
};

const CalendarDay = ({ day, session}: Props) => {
    const users = session.getUsers();
    const [dayUsers, setDayUsers] = useState<number[]>(day.getUsers());

    const handleClick = () => {
        console.debug('Clicked on day ' + day.toString());
        const currentUser = session.getCurrentUserIdx();
        day.toggleUser(currentUser);
        setDayUsers([...day.getUsers()]);
    };

    return <div onClick={handleClick}>
        <hr />
        <h2>{day.toString()}</h2>
        {dayUsers.length === 0 &&
            <p>No users</p> ||
            <ul>
                {dayUsers.map((userIdx, index) => 
                    <li key={index}>{users[userIdx].getName()}</li>
                )}
            </ul>
        }
        <hr />
    </div>;
};

export default CalendarDay;