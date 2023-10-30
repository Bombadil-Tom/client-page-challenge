import { clientPageConstants } from "../constants/clientPage.constants";
import { ClientModel } from "../api/model/ClientModel";


const initialState = {
    data: [],
    loading: false,
    error: null
};

type ClientState = {
    data: ClientModel[];
    loading: boolean;
    error: string | null;
};

type ClientAction =
    | { type: typeof clientPageConstants.LIST_CLIENTS }
    | { type: typeof clientPageConstants.LIST_CLIENTS_FULFILLED; payload: ClientModel[] }
    | { type: typeof clientPageConstants.LIST_CLIENTS_ERROR; payload: string };

const clientPageReducer = (state: ClientState = initialState, action: ClientAction): ClientState => {
    switch (action.type) {
        case clientPageConstants.LIST_CLIENTS:
            return {
                ...state,
                loading: true,
                error: null
            };
        case clientPageConstants.LIST_CLIENTS_FULFILLED:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            };
        case clientPageConstants.LIST_CLIENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default clientPageReducer;
