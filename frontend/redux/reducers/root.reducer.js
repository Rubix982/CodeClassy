import apiReducer from './api.reducer'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    apiReducer: apiReducer

});

export default rootReducer;