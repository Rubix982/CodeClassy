import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  teacherClassrooms: [],
  teacherSections: [],
  feedLoading: true,
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.teacherFeedLoaded:
      return {
        ...state,
        teacherClassrooms: action.payload.classrooms,
        teacherSections: action.payload.sections,
        feedLoading: false,
      };

    default:
      return { ...state };
  }
};

export default teacherReducer;
