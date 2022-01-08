import { actionTypes } from "redux/actionTypes/actionTypes";

const initialState = {
  postComments: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.postCommentsLoaded:
      return { ...state, postComments: action.payload.postComments };

    case actionTypes.commentAdded:
      return {
        ...state,
        postComments: [action.payload.postComments, ...state.postComments],
      };

    default:
      return { ...state };
  }
};

export default postReducer;
