import React from 'react';
import ClientPage from "../../components/ClientPage/ClientPage";
import {RootState} from "../../reducers";
import {Action, bindActionCreators, Dispatch} from "redux";
import * as ClientPageActions from "../../actions/clientPageActions";
import {connect} from "react-redux";
import {ClientModel} from "../../api/model/ClientModel";
import LoadingMessage from "../../components/LoadingMessage/LoadingMessage";
import GeneralErrorMessage from "../../components/ErrorMessages/GeneralErrorMessage";

type ClientPageProps = {
    clientPageActions: typeof ClientPageActions;
    clientPageReducer: any;
}

type SortDirection = null | 'asc' | 'desc';
export type SortField = 'client' | 'visaType' | 'lastActive';

export interface ClientPageState {
    sortDirection: {
        client: SortDirection;
        visaType: SortDirection;
        lastActive: SortDirection;
    };
    clients: ClientModel[];
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

export class ClientPageContainer extends React.Component <ClientPageProps,ClientPageState> {
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

    handleSort = (field: SortField) => {
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


    render() {
        if(this.props.clientPageReducer.loading){
            return <div className="container mx-auto mt-6">
                <LoadingMessage />
            </div>
        }

        if(this.props.clientPageReducer.error){
            return <div className="container mx-auto mt-6">
                <GeneralErrorMessage />
            </div>
        }

        return (
            <div className="container mx-auto mt-6">
                <ClientPage
                    {...this.state}
                    onSort={this.handleSort.bind(this)}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientPageContainer);