import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "redux/actions/error.action";

export const getMembersForClassroomView = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const results = await api.get(`classroom/${id}/people`);

      setClassroomMemberStates(dispatch, results.data);
    } catch (error) {
      errorHandler(error);
    }
  };
};

const setClassroomMemberStates = (dispatch, data) => {
  dispatch({
    type: actionTypes.classroomMembersLoaded,
    payload: {
      classroomMembers: data,
      hasDataLoaded: true,
    },
  });
};

export const setSuccessStates = (dispatch, message) => {
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
