import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
  classroomInformation : {},
  totalSections : []
}

const classroomReducer = (state = initialState, action) => {
    switch (action.type) {

      case actionTypes.setClassroomStates:
        return { ...state, 
          classroomInformation: action.payload.classroomInformation,
          totalSections:  action.payload.sections
        }

      case actionTypes.addSection:
        return { ...state, 
          totalSections: [...state.totalSections, action.payload.newSection]
        }

      default:
        return {...state}
    }
  };

export default classroomReducer;



