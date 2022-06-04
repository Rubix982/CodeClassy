import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { setErrorStates, setSuccessStates } from "./login.action";

export const getCodingQuestions = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = api.get("coding-question");

      setCodingQuestions(dispatch, response.data);
      setSuccessStates(dispatch, response.msg);
    } catch (error) {
      setErrorStates(dispatch, error);

      return false;
    }
  };
};

export const addCodingQuestions = (codingQuestion) => {
  return async (dispatch) => {
    try {
      console.log(codingQuestion);
      const api = API.getInstance();

      const response = api.post("coding-question", {
        title: codingQuestion.title,
        body: codingQuestion.body,
        testCases: codingQuestion.testCases,
      });

      setSuccessStates(dispatch, response.msg);
    } catch (error) {
      setErrorStates(dispatch, error);

      return false;
    }
  };
};

const setCodingQuestions = (dispatch, data) => {
  dispatch({
    type: actionTypes.loadCodingQuestions,
    payload: {
      codingQuestions: data,
    },
  });
};
