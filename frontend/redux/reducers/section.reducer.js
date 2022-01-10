import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  classroomName: "",
  classroomDescription: "",
  sectionName: "",
  teacherFullName: "",
  announcements: [],
  students: [],
  sectionLoaded: false,
};

const sectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.sectionLoaded:
      return {
        ...state,
        classroomName: action.payload.classroomName,
        classroomDescription: action.payload.classroomDescription,
        sectionName: action.payload.sectionName,
        teacherFullName: action.payload.teacherFullName,
        announcements: action.payload.announcements,
        students: action.payload.students,
        sectionLoaded: true,
      };

    case actionTypes.announcementPosted:
      return {
        ...state,
        announcements: [action.payload.announcements, ...state.announcements],
      };

    case actionTypes.unauthorizedVisit:
      return { ...state };

    case actionTypes.sectionLoadFailed:
      return { ...state };

    default:
      return { ...state };
  }
};

export default sectionReducer;
