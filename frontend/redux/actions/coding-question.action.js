// API import
import API from "api";

// NextJS imports
import Router from "next/router";

// ActionTypes import
import { actionTypes } from "redux/actionTypes/actionTypes";

// ErrorHandler import
import { errorHandler } from "./error.action";

// SuccessHandler import
import { successHandler } from "./success.action";

export const getCodingQuestions = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get("coding-question");
      setCodingQuestions(dispatch, response.data);
      successHandler(dispatch, response.data.msg);
    } catch (error) {
      Router.push({
        pathname: "/h",
        query: { errorMessage: "Coding questions could not be fetched!" },
      });
      errorHandler(dispatch, error);
    }
  };
};

export const addCodingQuestions = (codingQuestion) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.post("coding-question", {
        title: codingQuestion.title,
        body: codingQuestion.body,
        testCases: codingQuestion.testCases,
      });
      successHandler(dispatch, response.data.msg);
      Router.push({
        pathname: "/h",
      });
    } catch (error) {
      Router.push({
        pathname: "/h",
        query: { errorMessage: "Coding Question could not be created!" },
      });
      errorHandler(dispatch, error);
    }
  };
};

const setCodingQuestions = (dispatch, data) => {
  dispatch({
    type: actionTypes.loadCodingQuestions,
    payload: {
      codingQuestions: data.codingQuestionResults,
    },
  });
};
