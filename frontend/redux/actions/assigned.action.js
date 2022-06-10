import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "./error.action";

export const getAllAssignedAssignments = (assignmentID) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.get(`assigned/${assignmentID}`);

      setAssigned(dispatch, response.data.data[0]);
      setSuccessStates(dispatch, response.data.msg);
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};

const setAssigned = (dispatch, data) => {
  dispatch({
    type: actionTypes.loadAssignedAssignments,
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
      const api = API.getInstance();
      let response;
      if (students.length == 1 && sectionID === "") {
        response = await api.post(`assigned/${assignmentID}/individual`, {
          email: students[0],
        });
      } else if (students.length > 1 && sectionID === "") {
        response = await api.post(`assigned/${assignmentID}/group`, {
          emails: students,
        });
      } else if (students.length === 0 && sectionID !== "") {
        response = await api.post(`assigned/${assignmentID}/section/`, {
          id: sectionID,
        });
      }
      setSuccessStates(dispatch, response.msg);
    } catch (error) {
      errorHandler(dispatch, error);
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
