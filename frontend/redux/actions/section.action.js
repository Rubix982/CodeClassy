import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "redux/actions/error.action";
import Router from "next/router";

export const getSectionAction = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get(`section/${id}`);
      dispatch({ type: actionTypes.sectionLoaded, payload: response.data });
    } catch (error) {
      errorHandler(dispatch, error);

      Router.push({
        pathname: "/error",
        query: { errorMessage: "Section not found" },
      });
    }
  };
};

export const postAnnouncementContent = (id, data, name) => {
  return async (dispatch) => {
    try {
      openInformationStates(dispatch, "Announcement is being posted");

      await closeInformationStates(dispatch);

      const api = API.getInstance();
      const response = await api.post(`section/${id}/announcement`, data);

      const announcement = {
        ID: response.data.announcement.ID,
        contentBody: response.data.announcement.contentBody,
        creationDate: response.data.announcement.creationDate,
        teacherFullName: name,
      };

      setAnnouncementStates(dispatch, announcement);
      setSuccessStates(dispatch, response.data.msg);
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};

const setAnnouncementStates = (dispatch, data) => {
  dispatch({
    type: actionTypes.announcementPosted,
    payload: {
      announcements: data,
    },
  });
};

const openInformationStates = (dispatch, message) => {
  dispatch({
    type: actionTypes.loading,
    payload: {
      progressMessage: message,
      progressMessageSnackbarState: true,
    },
  });
};

const closeInformationStates = async (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: actionTypes.loading,
      payload: {
        progressMessage: "",
        progressMessageSnackbarState: false,
      },
    });
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
