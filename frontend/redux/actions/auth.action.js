import API from "api";
import { actionTypes } from "../actionTypes/actionTypes";

export const authorizeUser = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get("auth");

      if (response.data) {
        dispatch({
          type: actionTypes.userLoaded,
          payload: {
            userEmail: response.data.email,
            userRole: response.data.role,
            userFullName: response.data.fullName,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.userLoadedError,
      });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      await api.post("auth/logout", {});
      dispatch({
        type: actionTypes.userLogout,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.userLogoutError,
      });
    }
  };
};
