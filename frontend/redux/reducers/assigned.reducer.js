import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  assignedAssignmentName: "",
  codingQuestionData: {},
  sectionList: [{}],
  studentEmails: [],
  assignedAssignmentLoaded: false,
};

const assignedReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.loadAssignedAssignments:
      return {
        ...state,
        assignedAssignmentName: action.payload.assigned.name,
        codingQuestionData: action.payload.assigned.codingQuestionData,
        sectionList: action.payload.assigned.sectionList,
        studentEmails: action.payload.assigned.studentEmails,
        assignedAssignmentLoaded: true,
      };

    default:
      return { ...state };
  }
};

export default assignedReducer;
