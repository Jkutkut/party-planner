import { useEffect, useState } from "react";
import SessionModel from "../../model/session/Session";
import SessionHandler from "../../model/session/SessionHandler";
import Session from "./Session";

interface Props {
    setSession: (session: SessionModel) => void;
}

const validateSessionName: () => string | null = () => {
    const nameInput = document.getElementById('sessionName') as HTMLInputElement;
    const sessionName = nameInput.value.trim();
    nameInput.classList.remove('is-invalid');
    if (sessionName.length === 0) {
        nameInput.classList.add('is-invalid');
        return null;
    }
    else {
        nameInput.classList.add('is-valid');
    }
    return sessionName;
};

const validateSessionDate: () => Date | null = () => {
    const dateInput = document.getElementById('sessionDate') as HTMLInputElement;
    const sessionDate = new Date(dateInput.value);
    dateInput.classList.remove('is-invalid');
    if (isNaN(sessionDate.getTime())) {
        dateInput.classList.add('is-invalid');
        return null;
    }
    // else if (sessionDate.getTime() < Date.now()) {
    //     dateInput.classList.add('is-invalid');
    //     return null;
    // }
    else {
        dateInput.classList.add('is-valid');
    }
    return sessionDate;
}

const SessionCreation = ({setSession}: Props) => {
    const [sessionHandler] = useState<SessionHandler>(SessionHandler.getInstance());
    const [availableSessions, setAvailableSessions] = useState<SessionModel[]>([]);

    const createSession = () => {
        console.debug('Creating session');
        const sessionDate = validateSessionDate();
        const sessionName = validateSessionName();
        if (!sessionName || !sessionDate)
            return;
        const sessionHandler = SessionHandler.getInstance();
        const session: SessionModel | null = sessionHandler.createSession(sessionName, sessionDate);
        const nameInput = document.getElementById('sessionName') as HTMLInputElement;
        if (!session) {
            console.debug('Session with name ' + sessionName + ' already exists');
            nameInput.classList.add('is-invalid');
            return;
        }
        else {
            nameInput.classList.add('is-valid');
        }
        setSession(session);
        console.debug('Session created');
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
            <ul className="list-group">
                {availableSessions.map((session, index) =>
                    <Session key={index}
                        session={session}
                        setSession={setSession} deleteSession={deleteSession}
                    />
                )}
            </ul>
        </>}
        <h1>Create new</h1>
        <form className="row g-3 needs-validation" noValidate>
            <div className="input-group mb-3">
                <span className="input-group-text col-3" id="sessionNameText">Name</span>
                <input id="sessionName" type="text" className="form-control"
                    placeholder="Session name" aria-label="Session name"
                    aria-describedby="sessionNameText"
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Please provide a valid session name.</div>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text col-3" id="sessionDateText">
                    Start date
                </span>
                <input id="sessionDate" type="date" className="form-control"
                    placeholder="Start date" aria-label="Start date"
                    aria-describedby="sessionDateText"
                />
                <div className="valid-feedback">Great date!</div>
                <div className="invalid-feedback">Please provide a valid start date.</div>
            </div>
            <button type="button" className="btn btn-primary" onClick={createSession}>Create</button>
        </form>
    </>;
};

export default SessionCreation;