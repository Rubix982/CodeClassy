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
        query: { errorMessage: "Categories not found" },
      });
    }
  };
};

export const getAssignmentsByTeacher = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get("assignment/teacher");
      setAssignments(dispatch, response.data);
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

      const response = await api.get("assignment/teacher");

      setAssignments(dispatch, response.data);
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

      setAssignment(dispatch, response.data);
      successHandler(dispatch, response.data.msg);

      return true;
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

const addNewlyCreatedAssignment = (dispatch, data) => {
  dispatch({
    type: actionTypes.addAssignmentToList,
    payload: {
      assignments: data,
    },
  });
};
