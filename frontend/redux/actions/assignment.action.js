import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "./error.action";

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

      const response = await api.get("assignment");

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
      assignments: data, // assignments array
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
