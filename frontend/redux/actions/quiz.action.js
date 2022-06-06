import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { setSuccessState, setErrorStates } from "./login.action";

export const getQuizzesAction = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get("quiz");
      dispatch({
        type: actionTypes.getQuizzes,
        payload: {
          quizzes: response.data.quizzes,
        },
      });
      setSuccessState(dispatch, response.data.msg);
    } catch (error) {
      setErrorStates(dispatch, error.message);
    }
  };
};

export const getQuizInformationAction = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get(`quiz/${id}`);
      dispatch({
        type: actionTypes.getQuizInformation,
        payload: response.data.quiz,
      });
      setSuccessState(dispatch, response.data.msg);
    } catch (error) {
      setErrorStates(dispatch, error.message);
    }
  };
};
