import { actionTypes } from "../actionTypes/actionTypes"

const initialState = {
    loading: false,
    responseMessage: ''
}

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {

      case actionTypes.registerUserSuccess:
        return { ...state, responseMessage: action.successMessage};

      case actionTypes.registerUserFailed:
        return { ...state, responseMessage: action.errorMessage};

      case actionTypes.loading:
        return { ...state, loading: action.loadingState};

      default:
        return state;
    }
  };