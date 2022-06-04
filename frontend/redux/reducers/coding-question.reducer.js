import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {};

const codingQuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.loadCodingQuestions:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
};

export default codingQuestionReducer;
