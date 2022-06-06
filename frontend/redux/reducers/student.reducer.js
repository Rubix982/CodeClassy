import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  studentSections: [],
  studentQuizzes: { assignedQuizzes: [], results: [] },
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

    case actionTypes.getStudentQuizzes:
      return {
        ...state,
        studentQuizzes: action.payload.quizzes,
      };

    default:
      return { ...state };
  }
};

export default studentReducer;
