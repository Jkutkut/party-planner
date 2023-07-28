import Model from "../Model";
import Session from "./Session";

class SessionHandler extends Model {
    private static instance: SessionHandler;
    private sessions: Session[];
    private currentSession: Session | null;

    private constructor() {
        super();
        this.sessions = [];
        this.currentSession = null;
        this.loadSessions();
    }

    public static getInstance(): SessionHandler {
        if (!SessionHandler.instance) {
            SessionHandler.instance = new SessionHandler();
        }
        return SessionHandler.instance;
    }

    // -----------------------------------

    public getSessions(): Session[] {
        return this.sessions;
    }

    public getCurrentSession(): Session | null {
        return this.currentSession;
    }

    public setCurrentSession(sessionName: string): void {
        this.debug("Setting current session to", sessionName);
        for (let i = 0; i < this.sessions.length; i++) {
            if (this.sessions[i].getName() === sessionName) {
                this.setCurrentSessionObj(this.sessions[i]);
                return;
            }
        }
        this.error("session not found");
    }

    private setCurrentSessionObj(session: Session): void {
        this.currentSession = session;
        this.saveSessions();
    }

    public stopCurrentSession(): void {
        this.currentSession = null;
        this.saveSessions();
    }

    public createSession(sessionName: string, startDate: Date): Session | null {
        for (let i = 0; i < this.sessions.length; i++) {
            if (this.sessions[i].getName() === sessionName) {
                return null;
            }
        }
        const newSession = new Session(sessionName, startDate);
        this.sessions.push(newSession);
        this.setCurrentSessionObj(newSession);
        return newSession;
    }

    public deleteSession(sessionName: string): void {
        this.sessions = this.sessions.filter((session) => session.getName() !== sessionName);
        this.saveSessions();
    }

    // -----------------------------------

    protected loadSessions(): void {
        this.debug("Loading sessions from localStorage");
        const currentSession = localStorage.getItem("currentSession");
        if (currentSession) {
            this.debug("Loading current session from localStorage");
            try {
                this.currentSession = Session.fromJSON(JSON.parse(currentSession));
            }
            catch (e) {
                this.error(
                    "Failed to load current session from localStorage\n",
                    e, "\n", JSON.parse(currentSession)
                );
                localStorage.removeItem("currentSession");
            }
        }
        const sessions = localStorage.getItem("sessions");
        if (sessions) {
            this.debug("Loading sessions from localStorage");
            try {
                this.sessions = JSON.parse(sessions).map((session: any) => Session.fromJSON(session));
            } catch (e) {
                this.error(
                    "Failed to load sessions from localStorage\n",
                    e, "\n", JSON.parse(sessions)
                );
                localStorage.removeItem("sessions");
            }
        }
        this.debug("Loaded sessions from localStorage");
    }

    public saveSessions(): void {
        this.debug("Saving sessions to localStorage");
        localStorage.setItem("currentSession", JSON.stringify(this.currentSession));
        localStorage.setItem("sessions", JSON.stringify(this.sessions));
        this.debug("Saved sessions to localStorage");
    }
}

export default SessionHandler;