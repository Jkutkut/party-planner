import UserModel from "../../model/user/UserModel";

interface Props {
  user: UserModel;
  isCurrentUser: boolean;
  ftSelectUser: () => void;
  ftRemoveUser: () => void;
}

const User = ({user, isCurrentUser, ftSelectUser, ftRemoveUser}: Props) => {
  return (
    <div className="card" style={{marginTop: '0.5rem'}}>
      <div className="row align-items-center">
        <div className="col-4 text-start">
          <button type="button" className="btn btn-primary form-control" onClick={ftSelectUser}>
            {isCurrentUser ? 'Selected' : 'Select'}
          </button>
        </div>
        <div className="col">
          <span>{isCurrentUser ? <b>{user.getName()}</b> : user.getName()}</span>
        </div>
        <div className="col-2">
          <button type="button" className="btn-close" aria-label="Close"
            onClick={ftRemoveUser} {...{disabled: isCurrentUser}}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default User;