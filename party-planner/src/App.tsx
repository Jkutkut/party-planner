import { useState } from 'react';
import Calendar from './components/calendar/Calendar'
import SessionHandler from './model/session/SessionHandler';
import SessionCreation from './components/session/SessionCreation';
import UserModel from './model/user/UserModel';

function App() {
  const [sessionHandler] = useState<SessionHandler>(SessionHandler.getInstance());
  const [user, setUser] = useState<number>(0);
  const [session, setSession] = useState(sessionHandler.getCurrentSession());

  if (!session) {
    return <SessionCreation
      setSession={(session) => {
        sessionHandler.setCurrentSession(session.getName());
        setSession(session);
      }}
    />;
  }
  const users = session.getUsers();

  const selectSession = () => {
    sessionHandler.stopCurrentSession();
    setSession(null);
  };

  const addUser = () => {
    const userInput = document.getElementById('userInput') as HTMLInputElement;
    const username = userInput.value.trim();
    if (username.length === 0) {
      alert('User name cannot be empty!');
      return; // TODO handle this better
    }
    if (users.find(user => user.getName() === username)) {
      alert('User already exists!');
      return; // TODO handle this better
    }
    session.getUsers().push(new UserModel(username));
    userInput.value = '';
    userInput.focus();
    setUser(users.length);
  }

  return (
    <>
      <button onClick={selectSession}>Session selector</button>
      <div style={{float: 'right'}}>
        <h5>DEBUG: {user}</h5>
        {/* TODO fix select bug */}
        <select id="userSelector" onChange={(e) => setUser(parseInt(e.target.value))} value={user}>
          <option value={-1}>Select user</option>
          {users.map((user, index) => {
            return <option key={index} value={index}>{user.getName()}</option>
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
