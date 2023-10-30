import { combineReducers } from 'redux';
import clientPageReducer from './clientPageReducer';

const rootReducer = combineReducers({
    clientPageReducer: clientPageReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
