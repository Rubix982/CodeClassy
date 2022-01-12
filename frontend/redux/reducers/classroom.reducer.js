import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
  classroomLoaded: false,
  classroomInformation: {},
  totalSections: [],
};

const classroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setClassroomStates:
      return {
        ...state,
        classroomInformation: action.payload.classroomInformation,
        totalSections: action.payload.sections,
        classroomLoaded: true,
      };

    case actionTypes.addSection:
      return {
        ...state,
        totalSections: [...state.totalSections, action.payload.newSection],
      };

    

    case actionTypes.deleteSection:
      return {
        ...state,
        totalSections: state.totalSections.filter((element) => {
          return element.ID !== action.payload.id;
        }),
      };
    
    case actionTypes.updateSection: 
      return {
        ...state,
        totalSections: state.totalSections.map((section) => {
          if(section.ID == action.payload.section.ID){
            section.name = action.payload.section.name;
            section.teacherEmail = action.payload.section.teacherEmail;
          }
          return section;
      })
    };

    default:
      return { ...state };
  }
};

export default classroomReducer;
