import { actionTypes } from "../actionTypes/actionTypes";

const initialState = {
    responseMessage: ''
}

const registerReducer = (state = initialState, action) => {
    switch (action.type) {

      case actionTypes.registerUserSuccess:
        return { ...state, responseMessage: action.payload.successMessage};

      case actionTypes.registerUserFailed:
        return { ...state, responseMessage: action.payload.errorMessage};

      default:
        return {...state}
    }
  };

export default registerReducer;