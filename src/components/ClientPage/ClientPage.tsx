import React from 'react';
import { ClientModel } from "../../api/model/ClientModel";
import VisaLabel from "../VisaTypeLabel/VisaTypeLabel";
import {ClientPageState, SortField} from "../../containers/ClientPageContainer/ClientPageContainer";


interface AdditionalProps {
    onSort: (field: SortField) => void;
}

type ClientPageProps = ClientPageState & AdditionalProps;

export class ClientPage extends React.Component<ClientPageProps,{
}> {

    getSortIcon = (field: SortField) => {
        if (this.props.sortDirection[field] === 'asc') return (
            <span className="text-black text-lg tracking-tighter">&#9650;</span>);
        if (this.props.sortDirection[field] === 'desc') return (
            <span className="text-black text-lg tracking-tighter">&#9660;</span>);
        return '↕';
    };

    formatLastActive(date: string) {
        const now: any = new Date();
        const then: any = new Date(date);
        const diffDays = Math.floor((now - then) / (1000 * 60 * 60 * 24));

        if (diffDays <= 365) {
            return `${diffDays} days ago`;
        }

        return then.toISOString().split('T')[0].replace(/-/g, '/');
    }

    renderTable(){
        return this.props.clients.map((client: ClientModel, idx: number) => (
            <div key={idx} className="flex mb-4 border border-gray-200 bg-white shadow-md rounded-lg">
                <div className="flex-1 p-4">
                    <div className="text-xl font-bold mb-2">{client.fullname}</div>
                    <div className="text-sm text-gray-600">{client.company.name}</div>
                </div>
                <div className="flex-1 p-4 flex items-center">
                    {client.visas.map((visa, index) => <VisaLabel key={index} visaType={visa.name} />)}
                </div>
                <div className="flex flex-1 p-4 items-center">
                    {this.formatLastActive(client.lastActive)}
                </div>
            </div>)
        )
    }

    render() {
        return (
            <React.Fragment>
                <div className="flex mb-4 border-b border-gray-200 font-bold uppercase">
                    <div className="flex-1 p-4 cursor-pointer" onClick={() => this.props.onSort('client')}>
                        Client {this.getSortIcon('client')}
                    </div>
                    <div className="flex-1 p-4 cursor-pointer" onClick={() => this.props.onSort('visaType')}>
                        Visa-Type {this.getSortIcon('visaType')}
                    </div>
                    <div className="flex-1 p-4 cursor-pointer" onClick={() => this.props.onSort('lastActive')}>
                        Last Active {this.getSortIcon('lastActive')}
                    </div>
                </div>
                {this.renderTable()}
            </React.Fragment>
        );
    }
}

export default ClientPage;
