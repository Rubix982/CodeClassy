import { actionTypes } from "../actionTypes/actionTypes";
import API from "api";

export const createSectionAction = (newSection, id) => {
  return async (dispatch) => {
    try {
    const api = API.getInstance();
    await api.post(`classroom/${id}/section`, newSection);
    const section_id = ''; // extract from post call returned url
    newSection[section_id] = ''; // appending new section's id as new attirbute.
    addNewSection(dispatch, newSection);
    setSuccessStates(dispatch);
    } catch (error) {
        if(error.response){
            setErrorStates(dispatch, error.response.data.message[0]);
        }
        else if(error.request){
            console.log(error.request);
        }
        else {
            console.log('Error  --->', error.message);
        }
    }
  };
};

const addNewSection = (dispatch, newSection) => {
    dispatch({
        type: actionTypes.addSection,
        payload: {
          newSection: newSection
        }
    });
}

const setSuccessStates = (dispatch) => {
  dispatch({
    type: actionTypes.apiSuccess,
    payload: {
      successMessage: "New Section Created Successfully!",
      successMessageSnackbarState: true,
    }
  });
  setTimeout(() => {
    dispatch({
      type: actionTypes.apiSuccess,
      payload: { successMessage: "", successMessageSnackbarState: false },
    });
  }, 2000);
};

const setErrorStates = (dispatch, error) => {
  dispatch({
    type: actionTypes.apiFailed,
    payload: { errorMessage: error, errorMessageSnackbarState: true }
  });

  setTimeout(() => {
    dispatch({
      type: actionTypes.apiFailed,
      payload: { errorMessage: "", errorMessageSnackbarState: false }
    });
  }, 2000);
};
