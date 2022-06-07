import API from "api";
import Router from "next/router";
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

export const getQuizForAttemptionAction = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get(`quiz-assignment/${id}`);
      dispatch({
        type: actionTypes.getQuizForAttemption,
        payload: {
          quiz: response.data,
        },
      });
    } catch (error) {
      setErrorStates(dispatch, error.message);
    }
  };
};

export const submitQuizForGradingAction = (id, data) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.post(`quiz-assignment/${id}`, data);
    } catch (error) {
      setErrorStates(dispatch, error.message);
    }
  };
};

export const createQuiz = (data) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      await api.post("teacher/quiz", data);
      Router.push("/h");
    } catch (error) {
      setErrorStates(dispatch, error.message);
    }
  };
};
