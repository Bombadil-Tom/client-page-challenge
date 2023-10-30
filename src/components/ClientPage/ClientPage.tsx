import React from 'react';
import { bindActionCreators, Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import * as ClientPageActions from "../../actions/clientPageActions";
import LoadingMessage from "../LoadingMessage/LoadingMessage";
import GeneralErrorMessage from "../ErrorMessages/GeneralErrorMessage";
import { RootState} from "../../reducers";
import { ClientModel } from "../../api/model/ClientModel";
import VisaLabel from "../VisaTypeLabel/VisaTypeLabel";

type ClientPageProps = {
    clientPageActions: typeof ClientPageActions;
    clientPageReducer: any;
}

function sortClientsByFullName(clients: ClientModel[], direction: 'asc' | 'desc'): ClientModel[] {
    return clients.sort((a, b) => {
        const nameA = a.fullname.toLowerCase();
        const nameB = b.fullname.toLowerCase();

        if (nameA < nameB) return direction === 'asc' ? -1 : 1;
        if (nameA > nameB) return direction === 'asc' ? 1 : -1;
        return 0;
    });
}

function sortClientsByLastActive(clients: ClientModel[], direction: 'asc' | 'desc'): ClientModel[] {
    return clients.sort((a, b) => {
        const dateA = new Date(a.lastActive);
        const dateB = new Date(b.lastActive);

        return direction === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
}

function sortClientsByVisaType(clients: ClientModel[], direction: 'asc' | 'desc'): ClientModel[] {
    return clients.sort((a, b) => {
        // Assuming the first visa's name for sorting
        const visaNameA = a.visas[0]?.name.toLowerCase() || '';
        const visaNameB = b.visas[0]?.name.toLowerCase() || '';

        if (visaNameA < visaNameB) return direction === 'asc' ? -1 : 1;
        if (visaNameA > visaNameB) return direction === 'asc' ? 1 : -1;
        return 0;
    });
}


export class ClientPage extends React.Component<ClientPageProps,{
    sortDirection: {
        client: null | 'asc' | 'desc';
        visaType: null | 'asc' | 'desc';
        lastActive: null | 'asc' | 'desc';
    };
    clients: ClientModel[]
}> {
    constructor(props: ClientPageProps) {
        super(props);
        this.state = {
            sortDirection: {
                client: null,
                visaType: null,
                lastActive: null,
            },
            clients: []
        };
    }

    componentDidMount() {
       this.props.clientPageActions.listClients();
    }

    componentDidUpdate(prevProps: ClientPageProps) {
        if (this.props.clientPageReducer.data !== prevProps.clientPageReducer.data) {
            this.setState({...this.state, clients: this.props.clientPageReducer.data});
        }
    }

    handleSort = (field: 'client' | 'visaType' | 'lastActive') => {
        const direction = this.state.sortDirection[field] === 'asc' ? 'desc' : 'asc';

        let sortedClients;
        const clients = [...this.props.clientPageReducer.data];  // Creating a shallow copy

        switch (field) {
            case 'client':
                sortedClients = sortClientsByFullName(clients, direction);
                break;
            case 'visaType':
                sortedClients = sortClientsByVisaType(clients, direction);
                break;
            case 'lastActive':
                sortedClients = sortClientsByLastActive(clients, direction);
                break;
            default:
                sortedClients = clients;  // Default to original list if no match
        }

        this.setState({
            ...this.state,
            clients: sortedClients,
            sortDirection: {
                ...this.state.sortDirection,
                [field]: direction
            }
        });
    };


    getSortIcon = (field: 'client' | 'visaType' | 'lastActive') => {
        if (this.state.sortDirection[field] === 'asc') return (
            <span className="text-black text-lg tracking-tighter">&#9650;</span>);
        if (this.state.sortDirection[field] === 'desc') return (
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
        return this.state.clients.map((client: ClientModel, idx: number) => (
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
        if(this.props.clientPageReducer.loading){
            return <LoadingMessage />
        }

        if(this.props.clientPageReducer.error){
            return <div className="container mx-auto mt-6">
                <GeneralErrorMessage />
            </div>
        }

        return (
            <div className="container mx-auto mt-6">
                <div className="flex mb-4 border-b border-gray-200 font-bold uppercase">
                    <div className="flex-1 p-4 cursor-pointer" onClick={() => this.handleSort('client')}>
                        Client {this.getSortIcon('client')}
                    </div>
                    <div className="flex-1 p-4 cursor-pointer" onClick={() => this.handleSort('visaType')}>
                        Visa-Type {this.getSortIcon('visaType')}
                    </div>
                    <div className="flex-1 p-4 cursor-pointer" onClick={() => this.handleSort('lastActive')}>
                        Last Active {this.getSortIcon('lastActive')}
                    </div>
                </div>
                {this.renderTable()}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return ({
        clientPageReducer: state.clientPageReducer,
    });
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    clientPageActions: bindActionCreators(ClientPageActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);