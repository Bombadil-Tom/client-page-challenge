import { CompanyModel } from "./CompanyModel";
import { VisaTypeModel } from "./VisaTypeModel";

export class ClientModel {
    id: number;
    fullname: string;
    lastActive: string;
    company: CompanyModel;
    visas: VisaTypeModel[];

    constructor(id: number, fullname: string, lastActive: string, company: CompanyModel, visas: VisaTypeModel[]) {
        this.id = id;
        this.fullname = fullname;
        this.lastActive = lastActive;
        this.company = CompanyModel.fromJSON(company);
        this.visas = visas.map(VisaTypeModel.fromJSON);
    }

    static fromJSON(json: any): ClientModel {
        return new ClientModel(
            json.id,
            json.fullname,
            json.last_active,
            CompanyModel.fromJSON(json.company),
            json.visas.map(VisaTypeModel.fromJSON),
        );
    }

    toPlainObject(): any {
        return {
            id: this.id,
            fullname: this.fullname,
            lastActive: this.lastActive,
            company: this.company.toPlainObject(),
            visas: this.visas.map(visa => visa.toPlainObject()),
        };
    }
}