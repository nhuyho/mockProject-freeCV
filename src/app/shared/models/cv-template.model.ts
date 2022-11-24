export interface TemplateItemDocument {
    name: string,
    template: string,
    thumbnail: string
}

export interface EditOption {
    themeColor: string,
    font: string,
    fontSize: string,
    lineHeight: string,
    background: string,
    secondTextColor: string
}

export interface BackgroundOption {
    color: string,
    backgroundUrl: string,
    secondTextColor: string
}

export interface DisplayOption {
    objective: boolean,
    skills: boolean,
    references: boolean,
    education: boolean,
    workExperience: boolean,
    activities: boolean,
    awards: boolean,
    certifications: boolean,
    interests: boolean,
    additionalInformation: boolean
}

export interface FormGroupBasic {
    address: string,
    dob: string,
    email: string,
    gender: string,
    link: string,
    name: string,
    phone: string
}

export interface FormGroupEducation {
    summary: string,
    endDate: string,
    institution: string,
    major: string,
    startDate: string
}

export interface FormGroupActivity {
    endDate: string,
    organization: string,
    position: string,
    startDate: string,
    summary: string
}

export interface FormGroupExperience {
    endDate: string,
    name: string,
    position: string,
    startDate: string,
    summary: string
}

export interface FormGroupSkill {
    level: string,
    name: string
}

export interface FormGroupReference {
    name: string,
    reference: string
}

export interface FormGroupAward {
    date: string,
    summary: string
}

export interface FormGroupCertification {
    date: string,
    summary: string
}

export class CVTemplate {
    id: string;
    template: string;
    language: string;
    latestUpdate: number;
    thumbnail: string;
    basics: FormGroupBasic;
    objective: string;
    education: Array<FormGroupEducation>;
    activities: Array<FormGroupActivity>;
    workExperience: Array<FormGroupExperience>;
    skills: Array<FormGroupSkill>;
    references: Array<FormGroupReference>;
    awards: Array<FormGroupAward>;
    certifications: Array<FormGroupCertification>;
    cvTitle: string;
    image: string;
    interests: string;
    title: string;
    additionalInformation: string;
    editOptions: EditOption;
    displayOptions: DisplayOption;

    constructor(
        id: string,
        template: string,
        language: string,
        latestUpdate: number,
        thumbnail: string,
        basics: FormGroupBasic,
        objective: string,
        education: Array<FormGroupEducation>,
        activities: Array<FormGroupActivity>,
        workExperience: Array<FormGroupExperience>,
        skills: Array<FormGroupSkill>,
        references: Array<FormGroupReference>,
        awards: Array<FormGroupAward>,
        certifications: Array<FormGroupCertification>,
        cvTitle: string,
        image: string,
        interests: string,
        title: string,
        additionalInformation: string,
        editOptions: EditOption,
        displayOption: DisplayOption
    ) {
        this.id = id;
        this.template = template;
        this.language = language;
        this.latestUpdate = latestUpdate;
        this.thumbnail = thumbnail;
        this.basics = basics;
        this.objective = objective;
        this.education = education;
        this.activities = activities;
        this.workExperience = workExperience;
        this.skills = skills;
        this.references = references;
        this.awards = awards;
        this.certifications = certifications;
        this.cvTitle = cvTitle;
        this.image = image;
        this.interests = interests;
        this.title = title;
        this.additionalInformation = additionalInformation;
        this.editOptions = editOptions;
        this.displayOptions = displayOption;
    }
}