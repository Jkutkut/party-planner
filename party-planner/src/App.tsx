import { useState } from 'react';
import Calendar from './components/calendar/Calendar'
import SessionHandler from './model/session/SessionHandler';
import SessionCreation from './components/session/SessionCreation';
import UserSelector from './components/user/UserSelector';

function App() {
  const [sessionHandler] = useState<SessionHandler>(SessionHandler.getInstance());
  const [session, setSession] = useState(sessionHandler.getCurrentSession());

  const [userIdx, setUserIdx] = useState<number>(-1);

  if (!session) {
    return <SessionCreation
      setSession={(session) => {
        sessionHandler.setCurrentSession(session.getName());
        setSession(session);
        // TODO set user
      }}
    />;
  }

  const selectSession = () => {
    sessionHandler.stopCurrentSession();
    setSession(null);
  };

  return (
    <>
      <button onClick={selectSession}>Session selector</button>
      <div style={{float: 'right'}}>
        <UserSelector
          session={session}
          userIdx={userIdx}
          setUserIdx={setUserIdx}
        />
      </div>
      <p>User: {userIdx} -- {userIdx > 0 && session.getUsers()[userIdx].getName() || "None"}</p>
      <Calendar calendar={session.getCalendar()}/>
    </>
  )
}

export default App
