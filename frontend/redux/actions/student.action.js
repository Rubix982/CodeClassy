import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { setErrorStates } from "./login.action";

export const getStudentFeed = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get("student/feed");

      dispatch({
        type: actionTypes.studentFeedLoaded,
        payload: { studentSections: response.data },
      });
    } catch (error) {}
  };
};

export const getStudentQuizzes = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get("student/quizzes");
      dispatch({
        type: actionTypes.getStudentQuizzes,
        payload: { quizzes: response.data },
      });
    } catch (error) {
      setErrorStates(dispatch, error.message);
    }
  };
};
