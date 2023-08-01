import Session from "../../model/session/Session";
import UserModel from "../../model/user/UserModel";

interface Props {
  session: Session;
  userIdx: number;
  setUserIdx: (userIdx: number) => void;
  close: () => void;
}

const UserHandler = ({session, userIdx, setUserIdx, close}: Props) => {
  const users = session.getUsers();
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
    userInput.value = '';
    userInput.focus();

    const user = new UserModel(username);
    session.addUser(user);
    setUserIdx(session.getUsers().length - 1);
    
    // TODO
  }

  const selectUser = (userIdx: number, callClose: boolean = true) => {
    setUserIdx(userIdx);
    if (callClose)
      close();
  }

  const removeUsr = (userIndex: number) => {
    // TODO
    console.warn("TODO: remove user");
  }

  return (<>
    <button onClick={close} type="button" className="btn-close" aria-label="Close"/>
    <br /><br />
    <h3>Add User:</h3>
    <div className="input-group mb-3">
      <span className="input-group-text" id="addUsrText">Username</span>
      <input id="userInput" type="text" className="form-control"
        placeholder="" aria-label="Username" aria-describedby="addUsrText"
        onKeyDown={(e) => {
          if (e.key === 'Enter') addUser();
        }}
      />
    </div>
    <button type="button" className="btn btn-primary" onClick={addUser}>Add</button>
    <br /><br />
    <h3>Users:</h3>
    <div className='container text-center'>
      {users.map((user, index) =>
        <div key={index} className="container text-center">
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-primary" onClick={() => selectUser(index)}>
                Select
              </button>
            </div>
            <div className="col">
              <span>{user.getName()}</span>
            </div>
            <div className="col">
              <button type="button" className="btn-close" aria-label="Close" onClick={() => removeUsr(index)}></button>
            </div>
          </div>
        </div>
      )}
    </div>
  </>);
}

export default UserHandler;