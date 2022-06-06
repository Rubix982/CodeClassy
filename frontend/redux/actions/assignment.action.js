import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "./error.action";

export const createAssignment = (assignment, assignmentName) => {
  return async (dispatch) => {
    try {
      console.log(assignment, assignmentName);
      const api = API.getInstance();

      await api.post(`assignment`, {
        codingQuestionId: assignment.CodingQuestion_Id,
        name: assignmentName,
      });

      setSuccessStates(dispatch, `Assignment created successfully`);

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

      console.log(response);

      setAssignments(dispatch, response.data);
      setSuccessStates(dispatch, response.data.msg);

      return true;
    } catch (error) {
      errorHandler(dispatch, error);

      return false;
    }
  };
};

export const getAssignmentByID = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.get(`assignment/${id}`);

      setAssignment(dispatch, response.data);
      setSuccessStates(dispatch, response.data.msg);

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
      assignments: data.assignmentResults, // assignments array
    },
  });
};

const setAssignment = (dispatch, data) => {
  dispatch({
    type: actionTypes.loadAssignmentForPage,
    payload: {
      assignments: data.assignmentResults,
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
