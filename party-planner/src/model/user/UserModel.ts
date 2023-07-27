class UserModel {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public static fromJSON(json: any): UserModel {
        const { name } = json;
        return new UserModel(name);
    }

    public getName(): string {
        return this.name;
    }
}

export default UserModel;