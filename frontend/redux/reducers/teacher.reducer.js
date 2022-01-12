import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  teacherClassrooms: [],
  teacherSections: [],
  feedLoading: true,
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.teacherFeedLoaded:
      return {
        ...state,
        teacherClassrooms: action.payload.classrooms,
        teacherSections: action.payload.sections,
        feedLoading: false,
      };

    case actionTypes.deleteClassroom:
      return {
        ...state,
        teacherClassrooms: state.teacherClassrooms.filter((element) => {
          return element.classroomID !== action.payload.id;
        }),
      };

    case actionTypes.updateClassrooms: 
    return {
      ...state,
      teacherClassrooms: state.teacherClassrooms.map((classroom) => {
        if(classroom.classroomID == action.payload.classroom.ID){
          classroom.classroomName = action.payload.classroom.name;
          classroom.classroomDescription = action.payload.classroom.description;
        }
        return classroom;
    })
  };

    default:
      return { ...state };
  }
};

export default teacherReducer;
