import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  quizzes: [],
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getQuizzes:
      return {
        ...state,
        quizzes: action.payload.quizzes,
      };

    default:
      return state;
  }
};

export default quizReducer;
