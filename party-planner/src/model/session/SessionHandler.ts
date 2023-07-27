import Session from "./Session";

class SessionHandler {
    private static instance: SessionHandler;
    private sessions: Session[];
    private currentSession: Session | null;

    private constructor() {
        this.sessions = []; // TODO
        this.currentSession = null; // TODO
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
        return newSession;
    }

    // -----------------------------------
    protected loadSessions(): void {
        // TODO
    }

    protected saveSessions(): void {
        // TODO
    }
}

export default SessionHandler;