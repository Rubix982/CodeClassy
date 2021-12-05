import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
    totalSections : []
}

const classroomReducer = (state = initialState, action) => {
    switch (action.type) {

      case actionTypes.addSection:
        return { ...state, 
            totalSections: [...state.totalSections, action.payload.newSection]
        }

      default:
        return {...state}
    }
  };

export default classroomReducer;



