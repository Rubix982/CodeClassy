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
  quizForAttemption: {
    ID: "",
    name: "",
    duration: 0,
    MCQs: null,
    TFQs: null,
    FTQs: null,
  },
  quizLoading: true,
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
        quizLoading: false,
      };

    case actionTypes.getQuizForAttemption:
      return {
        ...state,
        quizForAttemption: action.payload.quiz,
        quizLoading: false,
      };

    default:
      return state;
  }
};

export default quizReducer;
