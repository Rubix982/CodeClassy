import API from "api";
import Router from "next/router";
import { actionTypes } from "redux/actionTypes/actionTypes";

export const getTeacherFeed = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get("teacher/feed");
      console.log(response.data.classrooms);
      dispatch({
        type: actionTypes.teacherFeedLoaded,
        payload: {
          classrooms: response.data.classrooms,
          sections: response.data.sections,
        },
      });
    } catch (error) {}
  };
};

export const createClassroom = (data) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.post("teacher/classroom", data);

      setSuccessStates(dispatch, response.data.msg);
      Router.push(`/classroom/${response.data.ID}`);
    } catch (error) {
      setErrorStates(dispatch, error.response.data.message[0]);
    }
  };
};

export const deleteClassroom = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      await api.delete(`classroom/${id}`);
      dispatch({
        type: actionTypes.deleteClassroom,
        payload: {
          id: id
        },
      });
      setSuccessStates(dispatch, "Classroom deleted");
    } catch (error) {
      setErrorStates(dispatch, "Classroom could not be deleted");
    }
  };
};

export const updateClassroom = (id, body) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.put(`classroom/${id}`, body);
      addUpdatedClassroom(dispatch, response.data.classroom)
      setSuccessStates(
        dispatch,
        `Successfully updated classroom '${body.name}'`
      );
    } catch (error) {
      setErrorStates(dispatch, "Classroom could not be updated");
    }
  };
};


const addUpdatedClassroom = (dispatch, newClassroom) => {
  dispatch({
    type: actionTypes.updateClassrooms,
    payload: {
      classroom: newClassroom
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

const setErrorStates = (dispatch, msg) => {
  dispatch({
    type: actionTypes.apiFailed,
    payload: {
      errorMessage: msg,
      errorMessageSnackbarState: true,
    },
  });

  setTimeout(() => {
    dispatch({
      type: actionTypes.apiFailed,
      payload: {
        errorMessage: "",
        errorMessageSnackbarState: false,
      },
    });
  }, 2000);
};
