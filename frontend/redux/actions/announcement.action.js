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

      const response = await api.put(`announcement/${id}`, content);
      setSuccessStates(dispatch, "Announcement updated successfully");
      dispatch({
        type: actionTypes.announcementLoaded,
        payload: response.data.announcement,
      });
    } catch (error) {
      errorHandler(handler, error);
    }
  };
};

export const deleteAnnouncement = (announcementID, sectionID) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      await api.delete(`announcement/${announcementID}`);
      setSuccessStates(dispatch, "Announcement deleted successfully");
      Router.push({
        pathname: `/section/${sectionID}`,
      });
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


export const deleteComment = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      await api.delete(`announcement-comment/${id}`);
      dispatch({ type: actionTypes.deleteComment, payload: { id } });
      setSuccessStates(dispatch, "Comment deleted successfully");
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};