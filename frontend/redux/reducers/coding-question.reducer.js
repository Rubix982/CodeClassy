import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  codingQuestions: [],
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
      };

    default:
      return { ...state };
  }
};

export default codingQuestionReducer;
