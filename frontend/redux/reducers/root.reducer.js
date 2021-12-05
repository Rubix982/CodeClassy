import apiReducer from './api.reducer'
import classroomReducer from './classroom.reducer'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    apiReducer: apiReducer,
    classroomReducer: classroomReducer

});

export default rootReducer;