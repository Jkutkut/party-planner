import { useEffect, useState } from 'react';
import Calendar from './components/calendar/Calendar'
import Session from './model/session/Session';
import SessionHandler from './model/session/SessionHandler';
import SessionCreation from './components/session/SessionCreation';

enum State {
  SessionPicker,
  Calendar
}

function App() {
  const [sessionHandler] = useState<SessionHandler>(SessionHandler.getInstance());
  const [session, setSession] = useState<Session | null>(null);
  const [state, setState] = useState<State>(State.SessionPicker);

  useEffect(() => {
    setSession(sessionHandler.getCurrentSession());
  }, []);

  if (!session || state === State.SessionPicker) {
    return <SessionCreation
      setSession={(session) => {
        setSession(session);
        setState(State.Calendar);
      }}
    />;
  }

  console.log(SessionHandler.getInstance());

  return (
    <>
      <button onClick={() => setState(State.SessionPicker)}>Session selector</button>
      <Calendar calendar={session.getCalendar()}/>
    </>
  )
}

export default App
