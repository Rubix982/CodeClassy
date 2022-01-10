import { combineReducers } from "redux";
import apiReducer from "./api.reducer";
import authReducer from "./auth.reducer";
import classroomReducer from "./classroom.reducer";
import studentReducer from "./student.reducer";
import teacherReducer from "./teacher.reducer";
import membersViewReducer from "./members-view.reducer";
import sectionReducer from "./section.reducer";
import announcementReducer from "./announcement.reducer";

const rootReducer = combineReducers({
  apiReducer: apiReducer,
  authReducer: authReducer,
  studentReducer: studentReducer,
  teacherReducer: teacherReducer,
  classroomReducer: classroomReducer,
  membersViewReducer: membersViewReducer,
  sectionReducer: sectionReducer,
  announcementReducer: announcementReducer,
});

export default rootReducer;
