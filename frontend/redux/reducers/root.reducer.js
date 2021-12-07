import apiReducer from './api.reducer'
import { combineReducers } from 'redux';
import classroomReducer from './classroom.reducer'
import studentReducer from "./student.reducer";
import teacherReducer from "./teacher.reducer";

const rootReducer = combineReducers({
    apiReducer: apiReducer,
    studentReducer: studentReducer,
    teacherReducer: teacherReducer,
    classroomReducer: classroomReducer
});

export default rootReducer;
