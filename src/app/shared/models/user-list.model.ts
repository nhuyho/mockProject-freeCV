export class User {
    id: string;
    fullName: string;
    gender: string;
    dayOfBirth: Date | number;
    email: string;
    phone: string;
    status: string;
    note: string;
    avatar: string;
    token: string;
    password: string;
    type: string;
    isAdmin: boolean;
    historyApplied: JobApplied[];

    constructor(
        id: string,
        fullName: string,
        gender: string,
        dayOfBirth: Date | number,
        email: string,
        phone: string,
        status: string,
        note: string,
        token: string,
        password: string,
        avatar: string,
        type: string,
        isAdmin: boolean,
        historyApplied: JobApplied[]
    ) {
        this.id = id;
        this.fullName = fullName;
        this.gender = gender;
        this.dayOfBirth = dayOfBirth;
        this.email = email;
        this.phone = phone;
        this.status = status;
        this.note = note;
        this.avatar = avatar;
        this.password = password;
        this.token = token;
        this.type = type;
        this.isAdmin = isAdmin;
        this.historyApplied = historyApplied;
    }
};

export class Options {
    label: string;
    value: string;

    constructor(label: string, value: string) {
        this.label = label;
        this.value = value
    }
}

export class JobApplied{
    id: string;
    image: string;
    title: string;
    dateJobApply: string; 
    idJob: string
    constructor(id: string, image: string, title: string,  dateJobApply: string, idJob: string) {
        this.id = id;
        this.image = image;
        this.title = title; 
        this.dateJobApply = dateJobApply;
        this.idJob = idJob;
    }
}