export interface Technology {
    name?: string;
    value?: string;
}
export interface Work {
    name?: string;
    value?: string;
}
export interface Place {
    name?: string;
    value?: string;
}
export interface Status {
    name?: string;
    value?: string;
}

export class Job{
    id: string;
    thumbnail: string;
    title: string;
    createAt: number | Date;
    workingForm: string;
    location: string;
    content: string;
    exp: string;
    salaryMax: number;
    salaryMin: number;
    quantity: number;
    deadline: number | Date;
    technology: string;
    constructor(
        id : string,
        thumbnail: string, 
        title: string,
        createAt: number | Date,
        workingForm: string,
        location: string,
        content: string,
        exp: string,
        salaryMax: number,
        salaryMin: number,
        quantity: number,
        deadline: number | Date,
        technology: string
    ){
        this.id = id;
        this.thumbnail = thumbnail;
        this.title = title;
        this.createAt = createAt;
        this.workingForm = workingForm;
        this.location = location;
        this.content = content;
        this.exp = exp;
        this.salaryMax = salaryMax;
        this.salaryMin = salaryMin;
        this.quantity = quantity;
        this.deadline = deadline;
        this.technology = technology;
    }
}

