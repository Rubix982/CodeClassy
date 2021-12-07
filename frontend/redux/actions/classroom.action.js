import { actionTypes } from "../actionTypes/actionTypes";
import axios from "axios";
import API from "api";


export const getClassroomAction = (id) => {
    return async (dispatch) => {
      try {
      const response = await axios.get(`http://localhost:5000/classroom/${id}`,{ withCredentials: true });
      setClassroomStates(dispatch, response.data);
      setSuccessStates(dispatch);
      } catch (error) {
          if(error.response){
              setErrorStates(dispatch, error.response.data.message);
          }
          else if(error.request){
              setErrorStates(dispatch, error.request);
          }
          else {
              setErrorStates(dispatch, error.message);
          }
      }
    };
  };




export const createSectionAction = (newSection, id) => {
  return async (dispatch) => {
    try {
    const api = API.getInstance();
    await api.post(`classroom/${id}/section`, newSection);
    const ID = ''; // extract from post call returned url
    newSection[ID] = ''; // appending new section's id as new attirbute.
    addNewSection(dispatch, newSection);
    setSuccessStates(dispatch);
    } catch (error) {
        if(error.response){
            setErrorStates(dispatch, error.response.data.message);
        }
        else if(error.request){
            setErrorStates(dispatch, error.request);
        }
        else {
            setErrorStates(dispatch, error.message);
        }
    }
  };
};


const setClassroomStates = (dispatch, data) => {
    dispatch({
        type: actionTypes.setClassroomStates,
        payload: {
          classroomInformation: {
              ID: data.ID,
              name: data.name,
              description: data.description,
              createdBy: data.createdBy
          },
          sections: data.sections
        }
    });
}


const addNewSection = (dispatch, newSection) => {
    dispatch({
        type: actionTypes.addSection,
        payload: {
          newSection: {ID: newSection.ID, name: newSection.name, teacherEmail: newSection.assignedTo}
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
