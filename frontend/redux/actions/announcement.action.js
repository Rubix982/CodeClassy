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

export const announcementPageLoadAction = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get(`announcement/${id}`);
      dispatch({
        type: actionTypes.announcementLoaded,
        payload: response.data,
      });
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
      const data = {
        fullName: response.data.announcementComment.commentatorFullName,
        creationDate: response.data.announcementComment.creationDate,
        contentBody: response.data.announcementComment.contentBody,
      };

      dispatch({ type: actionTypes.commentAdded, payload: data });
      setSuccessStates(dispatch, response.data.msg);
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
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
