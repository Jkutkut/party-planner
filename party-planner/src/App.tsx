import { useEffect, useState } from 'react';
import Calendar from './components/calendar/Calendar'
import SessionHandler from './model/session/SessionHandler';
import SessionCreation from './components/session/SessionCreation';
import UserSelector from './components/user/UserSelector';

function App() {
  const [sessionHandler] = useState<SessionHandler>(SessionHandler.getInstance());
  const [session, setSession] = useState(sessionHandler.getCurrentSession());
  const [userIdx, setUserIdx] = useState<number>(-1);

  useEffect(() => {
    if (session) {
      setUserIdx(session.getCurrentUserIdx());
    }
  }, [session]);

  if (!session) {
    return <SessionCreation
      setSession={(session) => {
        sessionHandler.setCurrentSession(session.getName());
        setSession(session);
        setUserIdx(session.getCurrentUserIdx());
      }}
    />;
  }

  const changeUserIdx = (userIdx: number) => {
    if (!session)
      return;
    console.debug('Changing user idx to ' + userIdx);
    session.setCurrentUserIdx(userIdx);
    setUserIdx(userIdx);
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
          setUserIdx={changeUserIdx}
        />
      </div>
      <Calendar session={session}/>
    </>
  )
}

export default App
