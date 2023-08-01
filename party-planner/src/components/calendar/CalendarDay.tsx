import { useState } from "react";
import CalendarDayModel from "../../model/calendar/CalendarDayModel";
import Session from "../../model/session/Session";

interface Props {
  day: CalendarDayModel;
  session: Session;
}

const CalendarDay = ({ day, session}: Props) => {
  const users = session.getUsers();
  const [dayUsers, setDayUsers] = useState<number[]>(day.getUsers());

  const handleClick = () => {
    const currentUser = session.getCurrentUserIdx();
    if (currentUser < 0) {
      return;
    }
    console.debug('Clicked on day ' + day.toString());
    day.toggleUser(currentUser);
    setDayUsers([...day.getUsers()]);
  };

  let nbrUsers: string;
  if (dayUsers.length === 0)
    nbrUsers = 'No users';
  else if (dayUsers.length === 1)
    nbrUsers = '1 user';
  else
    nbrUsers = dayUsers.length + ' users';

  return (
    <div className="card" style={{marginTop: "0.5rem"}} onClick={handleClick}>
      <div className="card-body">
        <h5 className="card-title">
          {day.toString()}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {nbrUsers}
        </h6>
        {dayUsers.length > 0 &&
          <div className="row">
            {dayUsers.map((userIdx, index) => 
              <div key={index} className="col-4">
                {users[userIdx].getName()}
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default CalendarDay;