import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {};

const assignedReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.loadAssignedAssignments:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
};

export default assignedReducer;
