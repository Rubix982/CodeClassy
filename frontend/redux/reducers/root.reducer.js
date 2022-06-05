import { combineReducers } from "redux";
import apiReducer from "./api.reducer";
import authReducer from "./auth.reducer";
import classroomReducer from "./classroom.reducer";
import studentReducer from "./student.reducer";
import teacherReducer from "./teacher.reducer";
import membersViewReducer from "./members-view.reducer";
import sectionReducer from "./section.reducer";
import announcementReducer from "./announcement.reducer";
import categoriesReducer from "./categories.reducer";
import codingQuestionReducer from "./coding-question.reducer";
import assignedReducer from "./assigned.reducer";
import questionReducer from "./question.reducer";
import assignmentReducer from "./assignment.reducer";

const rootReducer = combineReducers({
  apiReducer: apiReducer,
  authReducer: authReducer,
  studentReducer: studentReducer,
  teacherReducer: teacherReducer,
  classroomReducer: classroomReducer,
  membersViewReducer: membersViewReducer,
  sectionReducer: sectionReducer,
  announcementReducer: announcementReducer,
  categoriesReducer: categoriesReducer,
  codingQuestionReducer: codingQuestionReducer,
  assignedReducer: assignedReducer,
  assignmentReducer: assignmentReducer,
  questionReducer: questionReducer,
});

export default rootReducer;
