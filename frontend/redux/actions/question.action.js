import API from "api";
import Router from "next/router";
import { setErrorStates, setSuccessStates } from "./login.action";

export const createQuestionAction = (data, type) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.post(`teacher/question/${type}`, data);
      setSuccessStates(dispatch, response.data.msg);
      Router.push("/h");
    } catch (error) {
      setErrorStates(dispatch, error.message);
    }
  };
};
