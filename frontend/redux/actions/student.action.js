import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";

export const getStudentFeed = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get("student/feed");

      setTimeout(() => {
        dispatch({
          type: actionTypes.studentFeedLoaded,
          payload: { studentSections: response.data },
        });
      }, 1000);
    } catch (error) {}
  };
};
