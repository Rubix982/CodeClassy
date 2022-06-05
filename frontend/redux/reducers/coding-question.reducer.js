import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  codingQuestions: [],
  questionsLoaded: false
};

const codingQuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.loadCodingQuestions:
      return {
        ...state,
        codingQuestions: [
          ...state.codingQuestions,
          action.payload.codingQuestions,
        ],
        questionsLoaded: true
      };

    default:
      return { ...state };
  }
};

export default codingQuestionReducer;
