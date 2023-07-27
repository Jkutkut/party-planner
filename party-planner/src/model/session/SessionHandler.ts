import Session from "./Session";

class SessionHandler {
    private static instance: SessionHandler;
    private sessions: Session[];
    private currentSession: Session | null;

    private constructor() {
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

    public getCurrentSession(): Session | null {
        return this.currentSession;
    }

    public createSession(sessionName: string, startDate: Date): Session | null {
        for (let i = 0; i < this.sessions.length; i++) {
            if (this.sessions[i].getName() === sessionName) {
                return null;
            }
        }
        const newSession = new Session(sessionName, startDate);
        this.sessions.push(newSession);
        this.currentSession = newSession;
        this.saveSessions();
        return newSession;
    }

    // -----------------------------------
    protected loadSessions(): void {
        const currentSession = localStorage.getItem("currentSession");
        if (currentSession) {
            try {
                this.currentSession = Session.fromJSON(JSON.parse(currentSession));
            }
            catch (e) {
                console.warn("Failed to load current session from localStorage\n", e);
                console.info(JSON.parse(currentSession));
                localStorage.removeItem("currentSession");
            }
        }
        const sessions = localStorage.getItem("sessions");
        if (sessions) {
            try {
                this.sessions = JSON.parse(sessions).map((session: any) => Session.fromJSON(session));
            } catch (error) {
                console.warn("Failed to load sessions from localStorage\n", error);
                console.info(JSON.parse(sessions));
                localStorage.removeItem("sessions");
            }
        }
    }

    protected saveSessions(): void {
        localStorage.setItem("currentSession", JSON.stringify(this.currentSession));
        localStorage.setItem("sessions", JSON.stringify(this.sessions));
    }
}

export default SessionHandler;