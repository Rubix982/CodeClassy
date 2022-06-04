import API from "api";
import { actionTypes } from "redux/actionTypes/actionTypes";
import { errorHandler } from "./error.action";
import { setErrorStates, setSuccessStates } from "./login.action";

export const getAllAssignedAssignments = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = api.get("assigned");

      setAssigned(dispatch, response.data);
      setSuccessStates(dispatch, "Assigned assignments successfully fetched!");
    } catch (error) {
      errorHandler(dispatch, error);

      return false;
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

export const assignIndividualToAssignment = (assignmentID, email) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = api.post(`${assignmentID}/individual`, { email: email });

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

      const response = api.post(`${assignmentID}/group`, { emails: emails });

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

      const response = api.post(`${assignmentID}/section/${sectionID}`);

      setSuccessStates(dispatch, response.msg);
    } catch (error) {
      setErrorStates(dispatch, error);

      return false;
    }
  };
};
