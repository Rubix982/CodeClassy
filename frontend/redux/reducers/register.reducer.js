import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
    responseMessage: '',
    successMessageSnackbar: false
}

const registerReducer = (state = initialState, action) => {
    switch (action.type) {

      case actionTypes.registerUserSuccess:
        return { ...state, responseMessage: action.payload.successMessage};

      case actionTypes.registerUserFailed:
        return { ...state, responseMessage: action.payload.errorMessage};

      case actionTypes.successMessageSnackbarAction:
        return { ...state, successMessageSnackbar: action.payload.successMessageSnackbarState}

      default:
        return {...state}
    }
  };

export default registerReducer;