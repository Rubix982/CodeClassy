import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  assignment: [],
};

const assignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.loadAssignments:
      return {
        ...state,
        assignment: [action.payload.assignments],
      };

    default:
      return { ...state };
  }
};

export default assignmentReducer;
