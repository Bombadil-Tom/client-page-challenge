import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {clientPageConstants} from "../constants/clientPage.constants";
import * as clientApi from "../api/clientsApi";
import { ClientModel } from "../api/model/ClientModel";

export const listClients = () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({
        type: clientPageConstants.LIST_CLIENTS,
    });

    clientApi.listClientsAPI()
        .then(response => {
            const clientInstances = response.data.map((item: any)=>ClientModel.fromJSON(item));
            const plainClients = clientInstances.map((item: any) => item.toPlainObject());

            dispatch({
                type: clientPageConstants.LIST_CLIENTS_FULFILLED,
                payload: plainClients
            });
        })
        .catch(error => {
            console.log(error)
            dispatch({
                type: clientPageConstants.LIST_CLIENTS_ERROR,
                payload: error.toString()
            });
        });
};