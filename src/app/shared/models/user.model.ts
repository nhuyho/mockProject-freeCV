export class User {
    id: string;
    email: string;
    password: string;
    fullname: string;
    token: string;
    photo: string;
    type: string;
    isAdmin: boolean;

    constructor(
        id: string,
        email: string,
        password: string,
        fullname: string,
        token: string,
        photo: string,
        type: string,
        isAdmin: boolean
    ) {
        this.id = id;
        this.email = email,
        this.password = password,
        this.fullname = fullname,
        this.token = token,
        this.photo = photo,
        this.type = type,
        this.isAdmin = isAdmin
    }
}