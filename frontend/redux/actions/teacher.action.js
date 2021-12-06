import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";

export const getTeacherFeed = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get("teacher/feed");

      dispatch({
        type: actionTypes.teacherFeedLoaded,
        payload: {
          classrooms: response.data.classrooms,
          sections: response.data.sections,
        },
      });
    } catch (error) {}
  };
};
