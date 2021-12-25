import { actionTypes } from "../actionTypes/actionTypes";
import Router from "next/router";
import API from "api";

export const loginUserAction = (credentials) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.post("auth/signin", credentials);
      setSuccessStates(dispatch, response.data.payload);
    } catch (error) {
      if (error.response) {
        setErrorStates(dispatch, error.response.data.message);
      } else if (error.request) {
        setErrorStates(dispatch, error.request);
      } else {
        setErrorStates(dispatch, error.message);
      }
    }
  };
};

export const setSuccessStates = (dispatch, payload) => {
  dispatch({
    type: actionTypes.apiSuccess,
    payload: { successMessage: "Welcome!", successMessageSnackbarState: true },
  });
  setTimeout(() => {
    dispatch({
      type: actionTypes.apiSuccess,
      payload: { successMessage: "", successMessageSnackbarState: false },
    });
    dispatch({
      type: actionTypes.userLoggedIn,
      payload: { userRole: payload.role },
    });
  }, 2000);
};

export const setErrorStates = (dispatch, error) => {
  dispatch({
    type: actionTypes.apiFailed,
    payload: { errorMessage: error, errorMessageSnackbarState: true },
  });

  setTimeout(() => {
    dispatch({
      type: actionTypes.apiFailed,
      payload: { errorMessage: "", errorMessageSnackbarState: false },
    });
  }, 2000);
};
