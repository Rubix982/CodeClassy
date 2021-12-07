import apiReducer from "./api.reducer";
import { combineReducers } from "redux";
import studentReducer from "./student.reducer";
import teacherReducer from "./teacher.reducer";

const rootReducer = combineReducers({
  apiReducer: apiReducer,
  studentReducer: studentReducer,
  teacherReducer: teacherReducer,
});

export default rootReducer;
