import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "redux/actions/error.action";
import Router from "next/router";

export const getSectionAction = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const sectionDataResponse = await api.get(`section/${id}`);

      const announcementResponse = await api.get(`section/${id}/announcement`);

      const data = {
        teacherName: sectionDataResponse.data.teacherData[0].fullName,
        teacherEmail: sectionDataResponse.data.response.teacherEmail,
        sectionName: sectionDataResponse.data.response.name,
        announcements: announcementResponse.data.announcements,
      };

      setSectionStates(dispatch, data);
      setSuccessStates(dispatch, sectionDataResponse.data.msg);
    } catch (error) {
      errorHandler(dispatch, error);

      Router.push({
        pathname: "/error",
        query: { errorMessage: "Section not found" },
      });
    }
  };
};

const setSectionStates = (dispatch, data) => {
  dispatch({
    type: actionTypes.sectionLoaded,
    payload: {
      teacherName: data.teacherName,
      teacherEmail: data.teacherEmail,
      sectionName: data.sectionName,
      announcements: data.announcements,
      sectionLoaded: true,
    },
  });
};

export const postAnnouncementContent = (id, data, name) => {
  return async (dispatch) => {
    try {
      openInformationStates(dispatch, "Announcement is being posted");

      await closeInformationStates(dispatch);

      const api = API.getInstance();
      const response = await api.post(`section/${id}/announcement`, data);

      const announcement = {
        Announcement_ID: response.data.announcement.ID,
        Announcement_announcerEmail: response.data.announcement.announcer,
        Announcement_contentBody: response.data.announcement.contentBody,
        Announcement_creationDate: response.data.announcement.creationDate,
        member_fullName: name,
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
