import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  questions: [],
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getQuestions:
      return {
        ...state,
        questions: action.payload,
      };

    default:
      return state;
  }
};

export default questionReducer;
