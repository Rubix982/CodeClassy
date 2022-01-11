import { actionTypes } from "redux/actionTypes/actionTypes";

export const errorHandler = (dispatch, error) => {
  if (error.response) {
    setErrorStates(dispatch, error.response.data.message);
  } else if (error.request) {
    setErrorStates(dispatch, error.request);
  } else if (error.message) {
    setErrorStates(dispatch, error.message);
  } else {
    setErrorStates(dispatch, error);
  }
};

const setErrorStates = (dispatch, error) => {
  dispatch({
    type: actionTypes.apiFailed,
    payload: {
      errorMessage: error,
      errorMessageSnackbarState: true,
    },
  });

  setTimeout(() => {
    dispatch({
      type: actionTypes.apiFailed,
      payload: {
        errorMessage: error,
        errorMessageSnackbarState: false,
      },
    });
  }, 2000);
};
