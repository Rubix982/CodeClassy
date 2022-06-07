import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  assignedAssignmentName: "",
  codingQuestionData: {},
  sectionList: [{}],
  studentEmailJSONAggregate: [],
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
        studentEmailJSONAggregate:
          action.payload.assigned.studentEmailJSONAggregate === null
            ? []
            : action.payload.assigned.studentEmailJSONAggregate,
        assignedAssignmentLoaded: true,
      };

    default:
      return { ...state };
  }
};

export default assignedReducer;
