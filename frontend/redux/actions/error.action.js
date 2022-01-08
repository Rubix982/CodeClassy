import { actionTypes } from "redux/actionTypes/actionTypes";

export const errorHandler = (dispatch, error) => {
  console.log(error.message);

  if (error.response) {
    setErrorStates(dispatch, error.data);
  } else if (error.request) {
    setErrorStates(dispatch, error.request);
  } else if (error.message) {
    setErrorStates(dispatch, error.message);
  } else {
    setErrorStates(dispatch, error.message);
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
