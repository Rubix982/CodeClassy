// NextJS imports
import Router from "next/router";

// Redux imports
import { actionTypes } from "../actionTypes/actionTypes";

// API imports
import API from "api";

// ErrorHandler imports
import { errorHandler } from "redux/actions/error.action";

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.get(`category`);
      setCategories(dispatch, response.data);
      setSuccessStates(dispatch, `Categories read successfully!`)
    } catch (error) {
      errorHandler(dispatch, error);

      Router.push({
        pathname: "/error",
        query: { errorMessage: "Categories not found" },
      });
    }
  };
};

const setCategories = (dispatch, data) => {
    dispatch({
      type: actionTypes.addCategories,
      payload: {
        categories: data, //categories array
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
        payload: { successMessage: "", successMessageSnackbarState: false },
      });
    }, 2000);
  };
  




export const createCategory = (data) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      await api.post(`teacher/category`, data);
      addNewCategory(dispatch, data);
      setSuccessStates(dispatch, "New Category Created Successfully!");
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};


const addNewCategory = (dispatch, category) => {
  dispatch({
    type: actionTypes.getCategories,
    payload: {
        categories: category
    },
  });
};
