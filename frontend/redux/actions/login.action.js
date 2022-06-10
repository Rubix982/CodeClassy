import { actionTypes } from "../actionTypes/actionTypes";
import { errorHandler } from "./error.action";
import { successHandler } from "./success.action";
import API from "api";

export const loginUserAction = (credentials) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.post("auth/signin", credentials);
      successHandler(dispatch, "Welcome!");
      setUserRole(dispatch, response.data.payload);
    } catch (error) {
      errorHandler(dispatch, error);
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
