export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;

    constructor(){
        this.id = -1;
        this.name = "";
        this.email = "";
        this.password = "";
        this.role = "";
    }
}
