import Session from "../../model/session/Session";
import SessionHandler from "../../model/session/SessionHandler";

interface Props {
    onCreate: (session: Session) => void;
};

const SessionCreation = ({onCreate}: Props) => {
    const createSession = () => {
        const nameInput = document.getElementById('sessionName') as HTMLInputElement;
        const dateInput = document.getElementById('sessionDate') as HTMLInputElement;

        const sessionName = nameInput.value;
        const sessionDate = new Date(dateInput.value);

        const sessionHandler = SessionHandler.getInstance();
        const session: Session | null = sessionHandler.createSession(sessionName, sessionDate);
        if (!session) {
            alert('Session already exists!');
            return; // TODO: Handle this better
        }
        onCreate(session);
    };

    return <>
        <h1>Session Creation</h1>
        <input id="sessionName" type="text" placeholder="Session Name" />
        <input id="sessionDate" type="date" />
        <button onClick={createSession}>Create</button>
    </>;
};

export default SessionCreation;