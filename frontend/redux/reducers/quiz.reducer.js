import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  quizzes: [],
  quizInformation: {
    ID: "",
    name: "",
    duration: 0,
    questions: [],
    assignedTo: null,
    results: null,
  },
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getQuizzes:
      return {
        ...state,
        quizzes: action.payload.quizzes,
      };

    case actionTypes.getQuizInformation:
      return {
        ...state,
        quizInformation: action.payload,
      };

    default:
      return state;
  }
};

export default quizReducer;
