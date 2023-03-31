export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    userType: number;

    constructor(){
        this.id = -1;
        this.name = "";
        this.email = "";
        this.password = "";
        this.userType = 1;
    }
}
