import { useState } from "react";
import Session from "../../model/session/Session";
import UserModel from "../../model/user/UserModel";

interface Props {
  session: Session;
  userIdx: number;
  setUserIdx: (userIdx: number) => void;
  close: () => void;
}

const UserHandler = ({session, userIdx, setUserIdx, close}: Props) => {
  const [users, setUsers] = useState<UserModel[]>(session.getUsers());

  const addUser = () => {
    const userInput = document.getElementById('userInput') as HTMLInputElement;
    const username = userInput.value.trim();
    userInput.classList.remove('is-invalid');
    userInput.classList.remove('is-valid');
    if (username.length === 0) {
      return;
    }
    if (users.find(user => user.getName() === username)) {
      userInput.classList.add('is-invalid');
      return;
    }
    userInput.value = '';
    userInput.focus();
    session.addUser(new UserModel(username));
    setUserIdx(session.getUsers().length - 1);
    userInput.classList.add('is-valid');
    setUsers([...session.getUsers()]);
  }

  const selectUser = (userIdx: number, callClose: boolean = true) => {
    setUserIdx(userIdx);
    if (callClose)
      close();
  }

  const removeUsr = (userIndex: number) => {
    session.removeUser(userIndex);
    setUserIdx(session.getCurrentUserIdx());
    setUsers([...session.getUsers()]);
  }

  return (<>
    <div className="d-flex justify-content-end">
      <button onClick={close} type="button" className="btn-close" aria-label="Close"/>
    </div>
    <h3>Add User:</h3>
    <div className="input-group mb-3">
      <input id="userInput" type="text" className="form-control"
        placeholder="Username" aria-label="Username" aria-describedby="addUsrText"
        onKeyDown={(e) => {
          if (e.key === 'Enter') addUser();
        }}
      />
      <button type="button" className="btn btn-primary" onClick={addUser}>Add</button>
      <div className="valid-feedback">User added successfully!</div>
      <div className="invalid-feedback">User already exists!</div>
    </div>
    <h3>Users:</h3>
    <div className='container text-center'>
      {users.map((user, index) =>
        <div key={index} className="card" style={{marginTop: '0.5rem'}}>
          <div className="row align-items-center">
            <div className="col-4 text-start">
              <button type="button" className="btn btn-primary form-control" onClick={() => selectUser(index)}>
                {userIdx === index ? 'Selected' : 'Select'}
              </button>
            </div>
            <div className="col">
              <span>{userIdx === index ? <b>{user.getName()}</b> : user.getName()}</span>
            </div>
            <div className="col-2">
              <button type="button" className="btn-close" aria-label="Close"
                onClick={() => removeUsr(index)} {...{disabled: userIdx === index}}
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  </>);
}

export default UserHandler;