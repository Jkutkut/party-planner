import SessionModel from "../../model/session/Session";

interface Props {
  session: SessionModel;
  setSession: (session: SessionModel) => void;
  deleteSession: (sessionName: string) => void;
}

const Session = ({session, setSession, deleteSession}: Props) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <button type="button" className="btn btn-primary"
        onClick={() => setSession(session)}
      >Load</button>
      <div className="container text-center">
        {session.getName()}
      </div>
      <button type="button" className="btn btn-danger"
        onClick={() => deleteSession(session.getName())}
      >
          Delete
      </button>
    </li>
  );
};

export default Session;