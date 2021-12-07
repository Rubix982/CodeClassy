import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  studentSections: [],
  feedLoading: true,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.studentFeedLoaded:
      return {
        ...state,
        studentSections: action.payload.studentSections,
        feedLoading: false,
      };

    default:
      return { ...state };
  }
};

export default studentReducer;
