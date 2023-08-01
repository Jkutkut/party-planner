import { useState } from "react";
import Session from "../../model/session/Session";
import UserModel from "../../model/user/UserModel";
import User from "./User";
import AddUser from "./AddUser";

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
    <AddUser inputId="userInput" ftAddUser={addUser} />
    <h3>Users:</h3>
    <div className='container text-center'>
      {users.map((user, index) =>
        <User key={index}
          user={user}
          isCurrentUser={userIdx === index}
          ftSelectUser={() => selectUser(index)}
          ftRemoveUser={() => removeUsr(index)}
        />
      )}
    </div>
  </>);
}

export default UserHandler;