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
