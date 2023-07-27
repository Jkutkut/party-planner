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

    public getSessions(): Session[] {
        return this.sessions;
    }

    public getCurrentSession(): Session {
        if (!this.currentSession) {
            throw new Error("SessionHandler.getCurrentSession: no current session");
        }
        return this.currentSession;
    }

    public setCurrentSession(sessionName: string): void {
        for (let i = 0; i < this.sessions.length; i++) {
            if (this.sessions[i].getName() === sessionName) {
                this.setCurrentSessionObj(this.sessions[i]);
                return;
            }
        }
        console.error("SessionHandler.setCurrentSession: session not found");
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