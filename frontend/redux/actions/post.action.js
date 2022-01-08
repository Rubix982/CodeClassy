import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "redux/actions/error.action";

export const postPageLoad = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.get(`announcement/${id}/comment`);

      setPostComments(dispatch, response.data);

      setSuccessStates(dispatch, "Post page successfully loaded!");
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};

export const commentAddition = (id, comment) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.post(`announcement/${id}/comment`, comment);

      const announcementComment = {
        announcement_comment_ID: response.data.announcementComment.ID,
        announcement_comment_commentatorFullName:
          response.data.announcementComment.commentatorFullName,
        announcement_comment_contentBody:
          response.data.announcementComment.contentBody,
        announcement_comment_creationDate:
          response.data.announcementComment.creationDate,
      };

      setNewComment(dispatch, announcementComment);
      setSuccessStates(dispatch, response.data.msg);
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};

const setPostComments = (dispatch, comments) => {
  dispatch({
    type: actionTypes.postCommentsLoaded,
    payload: {
      postComments: comments,
    },
  });
};

const setNewComment = (dispatch, comment) => {
  dispatch({
    type: actionTypes.commentAdded,
    payload: {
      postComments: comment,
    },
  });
};

const setSuccessStates = (dispatch, message) => {
  dispatch({
    type: actionTypes.apiSuccess,
    payload: {
      successMessage: message,
      successMessageSnackbarState: true,
    },
  });

  setTimeout(() => {
    dispatch({
      type: actionTypes.apiSuccess,
      payload: {
        successMessage: "",
        successMessageSnackbarState: false,
      },
    });
  }, 2000);
};
