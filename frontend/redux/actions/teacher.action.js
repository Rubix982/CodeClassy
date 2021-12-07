import API from "api";
import Router from "next/router";
import { actionTypes } from "redux/actionTypes/actionTypes";

export const getTeacherFeed = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.get("teacher/feed");

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

      dispatch({
        type: actionTypes.apiSuccess,
        payload: {
          successMessage: response.data.msg,
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
      Router.push(`/classroom/${response.data.ID}`);
    } catch (error) {
      dispatch({
        type: actionTypes.apiFailed,
        payload: {
          errorMessage: error.response.data.message[0],
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
    }
  };
};
