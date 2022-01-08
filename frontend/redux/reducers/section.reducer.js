import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  teacherName: "",
  teacherEmail: "",
  sectionName: "",
  announcements: [],
  sectionLoaded: false,
};

const sectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.sectionLoaded:
      return {
        ...state,
        teacherName: action.payload.teacherName,
        teacherEmail: action.payload.teacherEmail,
        sectionName: action.payload.sectionName,
        announcements: action.payload.announcements,
        sectionLoaded: action.payload.sectionLoaded,
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
