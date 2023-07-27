import { useEffect, useState } from "react";
import Session from "../../model/session/Session";
import SessionHandler from "../../model/session/SessionHandler";

interface Props {
    setSession: (session: Session) => void;
};

const SessionCreation = ({setSession}: Props) => {
    const [sessionHandler] = useState<SessionHandler>(SessionHandler.getInstance());
    const [availableSessions, setAvailableSessions] = useState<Session[]>([]);

    const createSession = () => {
        const nameInput = document.getElementById('sessionName') as HTMLInputElement;
        const dateInput = document.getElementById('sessionDate') as HTMLInputElement;

        const sessionName = nameInput.value.trim();
        const sessionDate = new Date(dateInput.value);

        if (sessionName.length === 0) {
            alert('Session name cannot be empty!');
            return; // TODO: Handle this better
        }

        const sessionHandler = SessionHandler.getInstance();
        const session: Session | null = sessionHandler.createSession(sessionName, sessionDate);
        if (!session) {
            alert('Session already exists!');
            return; // TODO: Handle this better
        }
        setSession(session);
    };

    const deleteSession = (sessionName: string) => {
        sessionHandler.deleteSession(sessionName);
        setAvailableSessions(sessionHandler.getSessions());
    };

    useEffect(() => {
        setAvailableSessions(sessionHandler.getSessions());
    }, [sessionHandler]);

    return <>
        {availableSessions.length > 0 && <>
            <h2>Existing Sessions</h2>
            {availableSessions.map((session, index) => {
                return <div key={index}>
                    <button onClick={() => setSession(session)}>
                        {session.getName()}
                    </button>
                    <button onClick={() => deleteSession(session.getName())}>
                        Delete
                    </button>
                </div>;
            })}
        </>}
        <h1>Create new</h1>
        <input id="sessionName" type="text" placeholder="Session Name" />
        <input id="sessionDate" type="date" />
        <button onClick={createSession}>Create</button>
    </>;
};

export default SessionCreation;