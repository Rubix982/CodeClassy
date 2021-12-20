import { actionTypes } from "../actionTypes/actionTypes";

const intitialState = {
  userFullName: "",
  userRole: "",
  isAuthenticated: false,
  isLoading: true,
};

const authReducer = (state = intitialState, action) => {
  switch (action.type) {
    case actionTypes.userLoaded:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        userFullName: action.payload.userFullName,
        userRole: action.payload.userRole,
      };

    case actionTypes.userLoadedError:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
      };

    case actionTypes.userLoggedIn:
      return {
        ...state,
        isAuthenticated: true,
        userRole: action.payload.userRole,
      };

    default:
      return { ...state };
  }
};

export default authReducer;
