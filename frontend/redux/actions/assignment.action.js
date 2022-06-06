import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "./error.action";

export const createAssignment = (
  assignment,
  assignmentName,
  assignmentDueDate
) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      await api.post(`assignment`, {
        codingQuestionId: assignment.CodingQuestion_Id,
        name: assignmentName,
        dueDate: assignmentDueDate,
      });

      setSuccessStates(dispatch, `Assignment created successfully`);

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

export const getAssignments = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.get("assignment");

      setAssignments(dispatch, response.data);
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

      Router.push({
        pathname: "/error",
        query: { errorMessage: "Categories not found" },
      });
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
