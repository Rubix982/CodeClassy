import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "./error.action";

export const getCodingQuestions = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.get("coding-question");

      setCodingQuestions(dispatch, response.data);
      setSuccessStates(dispatch, response.data.msg);
    } catch (error) {
      errorHandler(dispatch, error);

      Router.push({
        pathname: "/error",
        query: { errorMessage: "Categories not found" },
      });
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

      setSuccessStates(dispatch, response.data.msg);

      Router.push({
        pathname: "/h",
      });
    } catch (error) {
      errorHandler(dispatch, error);

      Router.push({
        pathname: "/error",
        query: { errorMessage: "Categories not found" },
      });
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

const setSuccessStates = (dispatch, msg) => {
  dispatch({
    type: actionTypes.apiSuccess,
    payload: {
      successMessage: msg,
      successMessageSnackbarState: true,
    },
  });

  setTimeout(() => {
    dispatch({
      type: actionTypes.apiSuccess,
      payload: {
        successMessage: "",
        successMessageSnackbarState: false,
      },
    });
  }, 2000);
};
