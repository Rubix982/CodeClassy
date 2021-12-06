import apiReducer from "./api.reducer";
import { combineReducers } from "redux";
import studentReducer from "./student.reducer";

const rootReducer = combineReducers({
  apiReducer: apiReducer,
  studentReducer: studentReducer,
});

export default rootReducer;
