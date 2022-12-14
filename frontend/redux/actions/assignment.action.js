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

export const createAssignment = (
  assignment,
  assignmentName,
  assignmentDueDate
) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.post(`assignment`, {
        codingQuestionId: assignment.CodingQuestion_Id,
        name: assignmentName,
        dueDate: assignmentDueDate,
      });
      successHandler(dispatch, response.data.msg);
      Router.push({
        pathname: "/h",
      });
    } catch (error) {
      errorHandler(dispatch, error);
      Router.push({
        pathname: "/error",
        query: { errorMessage: "Assignment could not be created" },
      });
    }
  };
};

export const getAssignmentsByTeacher = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get("assignment/teacher");
      setAssignments(dispatch, response.data.assignmentResults);
      successHandler(dispatch, response.data.msg);
    } catch (error) {
      errorHandler(dispatch, error);
      Router.push({
        pathname: "/error",
        query: { errorMessage: "Assignments could not be fetched!" },
      });
    }
  };
};

export const getAssignmentsByStudent = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.get("assignment/student");

      setAssignments(dispatch, response.data.assignmentResults);
      successHandler(dispatch, response.data.msg);
    } catch (error) {
      errorHandler(dispatch, error);
      Router.push({
        pathname: "/error",
        query: { errorMessage: "Assignments could not be fetched!" },
      });
    }
  };
};

export const getAssignmentByID = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get(`assignment/${id}`);
      setAssignment(dispatch, response.data.assignmentResults);
      successHandler(dispatch, response.data.msg);
    } catch (error) {
      errorHandler(dispatch, error);
      Router.push({
        pathname: "/error",
        query: { errorMessage: "Assignment could not be fetched!" },
      });
    }
  };
};

export const deleteAssignment = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.delete(`assignment/${id}`);
      successHandler(dispatch, response.data.msg);
      Router.push({
        pathname: "/h",
      });
    } catch (error) {
      errorHandler(dispatch, error);
      Router.push({
        pathname: "/error",
        query: { errorMessage: "Assignment could not be deleted!" },
      });
    }
  };
};

const setAssignments = (dispatch, data) => {
  dispatch({
    type: actionTypes.loadAssignments,
    payload: {
      assignments: data,
    },
  });
};

const setAssignment = (dispatch, data) => {
  dispatch({
    type: actionTypes.loadAssignmentForPage,
    payload: {
      assignments: data,
    },
  });
};
