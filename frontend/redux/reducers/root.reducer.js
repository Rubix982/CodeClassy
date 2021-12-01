import {registerReducer} from '../reducers/register.reducer'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    registerReducer: registerReducer
});

export default rootReducer;