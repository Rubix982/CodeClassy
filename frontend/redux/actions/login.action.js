import { actionTypes } from "../actionTypes/actionTypes";
import Router from "next/router";
import API from "api";

export const loginUserAction = (credentials) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.post("auth/signin", credentials);
      setSuccessStates(dispatch, "Welcome!");
      setUserRole(dispatch, response.data.payload);
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

const setUserRole = (dispatch, role) => {
  setTimeout(() => {
    dispatch({
      type: actionTypes.userLoggedIn,
      payload: { userRole: role },
    });
  }, 2000);
};

export const setSuccessStates = (dispatch, message) => {
  dispatch({
    type: actionTypes.apiSuccess,
    payload: { successMessage: message, successMessageSnackbarState: true },
  });
  setTimeout(() => {
    dispatch({
      type: actionTypes.apiSuccess,
      payload: { successMessage: "", successMessageSnackbarState: false },
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
