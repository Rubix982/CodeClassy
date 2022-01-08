import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  sectionMembers: [],
  classroomMembers: [],
  hasDataLoaded: false,
};

const membersViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.sectionMembersLoaded:
      return {
        ...state,
        sectionMembers: action.payload.sectionMembers,
        hasDataLoaded: true,
      };

    case actionTypes.classroomMembersLoaded:
      return {
        ...state,
        classroomMembers: action.payload.classroomMembers,
        hasDataLoaded: true,
      };

    default:
      return { ...state };
  }
};

export default membersViewReducer;
