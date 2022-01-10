// API import
import API from "api";

// NextJS imports
import Router from "next/router";

// ActionTypes import
import { actionTypes } from "redux/actionTypes/actionTypes";

// ErrorHandler import
import { errorHandler } from "redux/actions/error.action";

export const updateAnnouncement = (id, content) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      setSuccessStates(dispatch, "Announcement updated successfully");
    } catch (error) {
      errorHandler(handler, error);
    }
  };
};

export const deleteAnnouncement = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      setSuccessStates(dispatch, "Announcement deleted successfully");
    } catch (error) {
      errorHandler(handler, error);
    }
  };
};

export const postPageLoad = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.get(`announcement/${id}/comment`);

      setPostComments(dispatch, response.data);

      setSuccessStates(dispatch, "Post page successfully loaded!");
    } catch (error) {
      errorHandler(dispatch, error);

      Router.push({
        pathname: "/error",
        query: { errorMessage: "Post not found" },
      });
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
