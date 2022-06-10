import API from "api";
import Router from "next/router";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "./error.action";
import { successHandler } from "./success.action";

export const createQuestionAction = (data, type) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.post(`teacher/question/${type}`, data);
      successHandler(dispatch, response.data.msg);
      Router.push("/h");
    } catch (error) {
      errorHandler(dispatch, error.message);
    }
  };
};

export const getQuestionsAction = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get("teacher/question");
      dispatch({
        type: actionTypes.getQuestions,
        payload: response.data.questions,
      });
      successHandler(dispatch, response.data.msg);
    } catch (error) {
      errorHandler(dispatch, error.message);
    }
  };
};
