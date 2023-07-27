class User {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public static fromJSON(json: any): User {
        const { name } = json;
        return new User(name);
    }

    public getName(): string {
        return this.name;
    }
}

export default User;