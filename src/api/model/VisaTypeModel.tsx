export class VisaTypeModel {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    static fromJSON(json: any): VisaTypeModel {
        return new VisaTypeModel(json.id, json.name);
    }

    toPlainObject(): any {
        return {
            id: this.id,
            name: this.name
        };
    }
}