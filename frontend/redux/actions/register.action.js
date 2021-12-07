import { actionTypes } from "../actionTypes/actionTypes";
import Router from "next/router";
import API from "api";

export const registerUserAction = (formData) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      await api.post("auth/signup", formData);
      setSuccessStates(dispatch);
    } catch (error) {
      if(error.response){
        setErrorStates(dispatch, error.response.data.message);
      }
      else if(error.request){
        setErrorStates(dispatch, error.request);
      }
      else {
        setErrorStates(dispatch, error.message);
      }
    }
  };
};

const setSuccessStates = (dispatch) => {
  dispatch({
    type: actionTypes.apiSuccess,
    payload: {
      successMessage: "User Registered Successfully!",
      successMessageSnackbarState: true,
    },
  });
  setTimeout(() => {
    dispatch({
      type: actionTypes.apiSuccess,
      payload: { successMessage: "", successMessageSnackbarState: false }
    });
    Router.push("/login");
  }, 2000);
};

const setErrorStates = (dispatch, error) => {
  dispatch({
    type: actionTypes.apiFailed,
    payload: { errorMessage: error, errorMessageSnackbarState: true }
  });

  setTimeout(() => {
    dispatch({
      type: actionTypes.apiFailed,
      payload: { errorMessage: "", errorMessageSnackbarState: false }
    });
  }, 2000);
};
