import API from "api";
import Router from "next/router";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "./error.action";
import { successHandler } from "./success.action";

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
      successHandler(dispatch, response.data.msg);
    } catch (error) {
      errorHandler(dispatch, error.message);
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
      successHandler(dispatch, response.data.msg);
    } catch (error) {
      errorHandler(dispatch, error.message);
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
      errorHandler(dispatch, error.message);
    }
  };
};

export const submitQuizForGradingAction = (id, data) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.post(`quiz-assignment/${id}`, data);
    } catch (error) {
      errorHandler(dispatch, error.message);
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
      errorHandler(dispatch, error.message);
    }
  };
};

export const assignQuizToSection = (data) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.post("quiz/section", data);
      successHandler(dispatch, response.data.msg);
    } catch (error) {
      errorHandler(dispatch, error.message);
    }
  };
};

export const assignQuizToStudent = (data) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.post("quiz/student", data);
      successHandler(dispatch, response.data.msg);
    } catch (error) {
      errorHandler(dispatch, error.message);
    }
  };
};
