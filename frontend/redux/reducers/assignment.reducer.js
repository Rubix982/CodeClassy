import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  assignments: [],
  assignmentsLoaded: false,
  assignmentForSinglePage: {},
  assignmentAssignedTo: [],
  assignmentLoaded: false,
};

const assignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.loadAssignments:
      return {
        ...state,
        assignments: [...action.payload.assignments],
        assignmentsLoaded: true,
      };

    case actionTypes.loadAssignmentForPage:
      return {
        ...state,
        assignmentForSinglePage: action.payload.assignmentForSinglePage,
        assignmentAssignedTo: [
          ...state.assignmentAssignedTo,
          action.payload.assignmentAssignedTo,
        ],
        assignmentLoaded: true,
      };

    default:
      return { ...state };
  }
};

export default assignmentReducer;
