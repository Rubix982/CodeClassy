import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
    responseMessage: '',
    successMessageSnackbar: false,
    errorMessageSnackbar: false,
}

const apiReducer = (state = initialState, action) => {
    switch (action.type) {

      case actionTypes.apiSuccess:
        return { ...state, 
        responseMessage: action.payload.successMessage, 
        successMessageSnackbar: action.payload.successMessageSnackbarState};

      case actionTypes.apiFailed:
        return { ...state, 
        responseMessage: action.payload.errorMessage, 
        errorMessageSnackbar: action.payload.errorMessageSnackbarState};

      default:
        return {...state}
    }
  };

export default apiReducer;



