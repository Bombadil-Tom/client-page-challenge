export class CompanyModel {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    static fromJSON(json: any): CompanyModel {
        return new CompanyModel(json.id, json.name);
    }

    toPlainObject(): any {
        return {
            id: this.id,
            name: this.name
        };
    }
}