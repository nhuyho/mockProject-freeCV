export class CvItem {
    id: string;
    name: string;
    template: string;
    isFirtClass: boolean;
    status: string;
    thumbnail: string;
    labels: Array<string>;
    title: string;
    colors: Array<string>;

    constructor(
        id: string,
        name: string,
        template: string,
        isFirtClass: boolean,
        status: string,
        thumbnail: string,
        labels: Array<string>,
        title: string,
        colors: Array<string>
    ) {
        this.id = id;
        this.name = name;
        this.template = template;
        this.isFirtClass = isFirtClass;
        this.status = status;
        this.thumbnail = thumbnail;
        this.labels = labels;
        this.title = title;
        this.colors = colors;
    }
}
