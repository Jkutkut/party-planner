import { useState } from 'react';
import Calendar from './components/calendar/Calendar'
import SessionHandler from './model/session/SessionHandler';
import SessionCreation from './components/session/SessionCreation';

enum State {
  SessionPicker,
  Calendar
}

function App() {
  const [sessionHandler] = useState<SessionHandler>(SessionHandler.getInstance());
  const [state, setState] = useState<State>(State.SessionPicker);

  const [user, setUser] = useState<number>(-1);
  const [users, setUsers] = useState<string[]>([]);

  const session = sessionHandler.getCurrentSession();
  if (session && state === State.SessionPicker) {
    setState(State.Calendar);
    return <></>;
  }
  if (state === State.SessionPicker) {
    return <SessionCreation
      setSession={(session) => {
        sessionHandler.setCurrentSession(session.getName());
        setState(State.Calendar);
      }}
    />;
  }

  const selectSession = () => {
    sessionHandler.stopCurrentSession();
    setState(State.SessionPicker);
  };

  const addUser = () => {
    const userInput = document.getElementById('userInput') as HTMLInputElement;
    const user = userInput.value.trim();
    if (user.length === 0) {
      alert('User name cannot be empty!');
      return; // TODO handle this better
    }
    if (users.includes(user)) {
      alert('User already exists!');
      return; // TODO handle this better
    }
    setUsers([...users, user]);
    userInput.value = '';
    userInput.focus();
    setUser(users.length);
  }

  return (
    <>
      <button onClick={selectSession}>Session selector</button>
      <div style={{float: 'right'}}>
        <select onChange={(e) => setUser(parseInt(e.target.value))} value={user}>
          <option value={-1}>Select user</option>
          {users.map((user, index) => {
            return <option key={index} value={index}>{user}</option>
          })}
        </select>
        <input id='userInput' type="text" placeholder="Add user" 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addUser();
            }
          }}
        />
        <button onClick={addUser}>Add</button>
      </div>
      <Calendar calendar={session.getCalendar()}/>
    </>
  )
}

export default App
