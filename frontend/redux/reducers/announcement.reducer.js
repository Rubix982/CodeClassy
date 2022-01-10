import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  teacherFullName: "",
  announcementCreationDate: "",
  announcementContentBody: "",
  announcementComments: [],
};

const announcementReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.announcementLoaded:
      return {
        ...state,
        teacherFullName: action.payload.teacherFullName,
        announcementCreationDate: action.payload.creationDate,
        announcementContentBody: action.payload.contentBody,
        announcementComments: action.payload.comments,
      };

    case actionTypes.commentAdded:
      return {
        ...state,
        announcementComments: [...state.announcementComments, action.payload],
      };

    default:
      return { ...state };
  }
};

export default announcementReducer;
