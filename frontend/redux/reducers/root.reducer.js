import { combineReducers } from "redux";
import apiReducer from "./api.reducer";
import authReducer from "./auth.reducer";
import classroomReducer from "./classroom.reducer";
import studentReducer from "./student.reducer";
import teacherReducer from "./teacher.reducer";
import postReducer from "./post.reducer";

const rootReducer = combineReducers({
  apiReducer: apiReducer,
  authReducer: authReducer,
  studentReducer: studentReducer,
  teacherReducer: teacherReducer,
  classroomReducer: classroomReducer,
  postReducer: postReducer,
});

export default rootReducer;
