import { useEffect, useState } from 'react';
import Calendar from './components/calendar/Calendar'
import Session from './model/session/Session';
import SessionHandler from './model/session/SessionHandler';
import SessionCreation from './components/session/SessionCreation';

function App() {
  const [sessionHandler] = useState<SessionHandler>(SessionHandler.getInstance());
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(sessionHandler.getCurrentSession());
  }, []);

  if (!session) {
    return <SessionCreation
      onCreate={(session) => {
        setSession(session);
      }}
    />;
  }

  console.log(SessionHandler.getInstance());

  return (
    <>
      <Calendar calendar={session.getCalendar()}/>
    </>
  )
}

export default App
