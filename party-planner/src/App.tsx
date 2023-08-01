import { useEffect, useState } from 'react';
import Calendar from './components/calendar/Calendar'
import SessionHandler from './model/session/SessionHandler';
import SessionCreation from './components/session/SessionCreation';
import UserModel from './model/user/UserModel';
import UserHandler from './components/user/UserHandler';

function App() {
  const [sessionHandler] = useState<SessionHandler>(SessionHandler.getInstance());
  const [session, setSession] = useState(sessionHandler.getCurrentSession());
  const [userIdx, setUserIdx] = useState<number>(-1);
  const [selectingUser, setSelectingUser] = useState<boolean>(false);

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


  // ---------------------------------------
  

  if (selectingUser) {
    return <UserHandler
      session={session}
      userIdx={userIdx}
      setUserIdx={changeUserIdx}
      close={() => setSelectingUser(false)}
    />;
  }

  return (
    <>
      <nav className="navbar sticky-top" style={{background: "var(--bs-body-bg)"}}>
        <button className='btn btn-outline-primary me-2'
          type='button' onClick={selectSession}
        >
          Sessions
        </button>
        {userIdx !== -1 &&
          // TODO make this better
          <span>{session.getUsers()[userIdx].getName()}</span>
        }
        <button onClick={() => setSelectingUser(true)} type="button" className="btn btn-primary">
          Change user
        </button>
        {/* {users.length > 0 &&
          <select className="form-select" style={{width:"auto"}} aria-label="User selector"
            value={userIdx}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              setUserIdx(v);
              if (v === -1)
                setSelectingUser(true);
            }}
          >
            <option value={-1}>Select user</option>
            {users.map((user, index) => {
              return <option key={index} value={index}>{user.getName()}</option>
            })}
          </select>
        } */}
        {/* <div className="input-group mb-3">
          <input id='userInput' className="form-control"
            type="text" placeholder="Add user"
            aria-label="Add user"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addUser();
              }
            }}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={() => {
          console.debug('Adding user');
        }}>
          {users.length === 0 ? 'Add user' : 'Add'}
        </button> */}
      </nav>
      <Calendar session={session}/>
    </>
  )
}

export default App
