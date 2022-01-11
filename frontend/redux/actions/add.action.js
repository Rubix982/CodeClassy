import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "./error.action";

export const addStudentAsMember = (id, email) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      await api.post(`section/${id}/student`, email);

      setSuccessStates(
        dispatch,
        `Member with email '${email.email}' added successfully`
      );
      return true;
    } catch (error) {
      errorHandler(dispatch, error);
      return false;
    }
  };
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
