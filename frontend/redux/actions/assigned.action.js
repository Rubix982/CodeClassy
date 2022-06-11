import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "./error.action";
import { successHandler } from "./success.action";

export const getAllAssignedAssignments = (assignmentID) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.get(`assigned/${assignmentID}`);

      setAssigned(dispatch, response.data.data[0]);
      successHandler(dispatch, response.data.msg);
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
      if (students.length >= 1 && sectionID == "") {
        response = await api.post(`assigned/${assignmentID}`, {
          emails: students,
        });
      } else if (students.length == 0 && sectionID != "") {
        response = await api.post(`assigned/${assignmentID}/section/`, {
          id: sectionID,
        });
      }
      const studentEmails = [];

      response.data.results.map((item) => {
        studentEmails.push(item.student.email);
      });

      addNewlyAssignedEmail(dispatch, studentEmails);
      successHandler(dispatch, response.data.msg);
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};

const addNewlyAssignedEmail = (dispatch, data) => {
  dispatch({
    type: actionTypes.addNewEmail,
    payload: {
      newEmails: data,
    },
  });
};

export const removeStudentFromAssignment = (assignmentID, email) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.delete(`assigned/${assignmentID}/${email}`);
      removeStudentFromAssigned(dispatch, email);
      successHandler(dispatch, response.data.msg);
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};

const removeStudentFromAssigned = (dispatch, email) => {
  dispatch({
    type: actionTypes.removeStudent,
    payload: {
      email: email,
    },
  });
};
