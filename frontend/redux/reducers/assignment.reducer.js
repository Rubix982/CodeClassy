import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {};

const assignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.loadAssignments:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
};

export default assignmentReducer;
