import { actionTypes } from "../actionTypes/actionTypes";
import Router from "next/router";
import API from "api";

export const loginUserAction = (credentials) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      await api.post("auth/signin", credentials);
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

export const setSuccessStates = (dispatch) => {
  dispatch({
    type: actionTypes.apiSuccess,
    payload: { successMessage: "Welcome!", successMessageSnackbarState: true }
  });
  setTimeout(() => {
    dispatch({
      type: actionTypes.apiSuccess,
      payload: { successMessage: "", successMessageSnackbarState: false }
    });
    //check roles here and redirect to home page depending of user's role.
    Router.push("/s/home");
  }, 2000);
};

export const setErrorStates = (dispatch, error) => {
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
