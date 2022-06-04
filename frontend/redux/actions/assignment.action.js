import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "./error.action";
import { setSuccessStates } from "./login.action";

export const createAssignment = (name) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      await api.post(`assignment`, { name: name });

      setSuccessStates(
        dispatch,
        `Assignment with name '${name}' created successfully`
      );

      return true;
    } catch (error) {
      errorHandler(dispatch, error);

      return false;
    }
  };
};

export const getAssignments = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = api.get("assignment");

      setAssignments(dispatch, response.data);
      setSuccessStates(dispatch, `Assignments successfully fetched`);

      return true;
    } catch (error) {
      errorHandler(dispatch, error);

      return false;
    }
  };
};

export const deleteAssignment = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      await api.delete(`assignment/${id}`);

      setSuccessStates(
        dispatch,
        `Successfully deleted assignment with id '${id}'`
      );

      return true;
    } catch (error) {
      errorHandler(dispatch, error);

      return false;
    }
  };
};

const setAssignments = (dispatch, data) => {
  dispatch({
    type: actionTypes.loadAssignments,
    payload: {
      loadAssignments: data, // assignments array
    },
  });
};
