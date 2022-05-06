import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  teacherFullName: "",
  announcementID: "",
  announcementCreationDate: "",
  announcementContentBody: "",
  announcementComments: [],
};

const announcementReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.announcementLoaded:
      return {
        ...state,
        teacherFullName: action.payload.teacherFullName,
        announcementID: action.payload.ID,
        announcementCreationDate: action.payload.creationDate,
        announcementContentBody: action.payload.contentBody,
        announcementComments: action.payload.comments,
      };

    case actionTypes.commentAdded:
      return {
        ...state,
        announcementComments: [...state.announcementComments, action.payload],
      };

    case actionTypes.deleteComment:
      return {
        ...state,
        announcementComments: state.announcementComments.filter((element) => {
          return element.ID !== action.payload.id;
        }),
      };

    case actionTypes.updateComment:
      return {
        ...state,
        announcementComments: state.announcementComments.map((comment) => {
          if(comment.ID == action.payload.comment.ID){
            comment.name = action.payload.comment.name;
            comment.teacherEmail = action.payload.comment.teacherEmail;
          }
          return comment;
      })
    };



    default:
      return { ...state };
  }
};

export default announcementReducer;
