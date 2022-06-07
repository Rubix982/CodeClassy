import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "./error.action";
import { setErrorStates } from "./login.action";

export const getAllAssignedAssignments = (assignmentID) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.get(`assigned/${assignmentID}`);

      setAssigned(dispatch, response.data);
      setSuccessStates(dispatch, response.msg);
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};

const setAssigned = (dispatch, data) => {
  dispatch({
    dispatch: actionTypes.loadAssignedAssignments,
    payload: {
      assigned: data,
    },
  });
};

export const postAssignedAssignmentsToStudents = (
  assignmentID,
  students,
  sectionID
) => {
  return async (dispatch) => {
    try {
      if (students.length == 1 && sectionID === "") {
        assignIndividualToAssignment(assignmentID, students);
      } else if (students.length > 1 && sectionID === "") {
        assignGroupToAssignment(assignmentID, students);
      } else if (students.length === 0 && sectionID !== "") {
        assignSectionToAssignment(assignmentID, sectionID);
      }

      setSuccessStates(dispatch, response.msg);
    } catch (error) {
      setErrorStates(dispatch, error);
    }
  };
};

export const assignIndividualToAssignment = (assignmentID, email) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.post(`${assignmentID}/individual`, {
        email: email,
      });

      setSuccessStates(dispatch, response.msg);
    } catch (error) {
      setErrorStates(dispatch, error);

      return false;
    }
  };
};

export const assignGroupToAssignment = (assignmentID, emails) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.post(`${assignmentID}/group`, {
        emails: emails,
      });

      setSuccessStates(dispatch, response.msg);
    } catch (error) {
      setErrorStates(dispatch, error);

      return false;
    }
  };
};

export const assignSectionToAssignment = (assignmentID, sectionID) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.post(`${assignmentID}/section/`, {
        id: sectionID,
      });

      setSuccessStates(dispatch, response.msg);
    } catch (error) {
      setErrorStates(dispatch, error);

      return false;
    }
  };
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
