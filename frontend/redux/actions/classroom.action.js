// NextJS imports
import Router from "next/router";

// Redux imports
import { actionTypes } from "../actionTypes/actionTypes";

// API imports
import API from "api";

// ErrorHandler imports
import { errorHandler } from "redux/actions/error.action";

export const getClassroomAction = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();

      const response = await api.get(`classroom/${id}`);

      setClassroomStates(dispatch, response.data);
    } catch (error) {
      errorHandler(dispatch, error);

      Router.push({
        pathname: "/error",
        query: { errorMessage: "Classroom not found" },
      });
    }
  };
};

export const createSectionAction = (newSection, id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.post(`classroom/${id}/section`, newSection);
      newSection.ID = response.data.sectionID;
      addNewSection(dispatch, newSection);
      setSuccessStates(dispatch, "New Section Created Successfully!");
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};

export const deleteSection = (id) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      await api.delete(`section/${id}`);
      dispatch({ type: actionTypes.deleteSection, payload: { id } });
      setSuccessStates(dispatch, "Deleted section successfully");
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};

export const updateSection = (id, body) => {
  return async (dispatch) => {
    try {
      const api = API.getInstance();
      const response = await api.put(`section/${id}`, body);
      addUpdatedSection(dispatch, response.data.section);
      setSuccessStates(dispatch, "Updated section successfully");
    } catch (error) {
      errorHandler(dispatch, error);
    }
  };
};


const addUpdatedSection = (dispatch, newSection) => {
  dispatch({
    type: actionTypes.updateSection,
    payload: {
      section: newSection
    },
  });
};




const setClassroomStates = (dispatch, data) => {
  dispatch({
    type: actionTypes.setClassroomStates,
    payload: {
      classroomInformation: {
        ID: data.ID,
        name: data.name,
        description: data.description,
        createdBy: data.createdBy,
      },
      sections: data.sections,
    },
  });
};

const addNewSection = (dispatch, newSection) => {
  dispatch({
    type: actionTypes.addSection,
    payload: {
      newSection: {
        ID: newSection.ID,
        name: newSection.name,
        teacherEmail: newSection.assignedTo,
      },
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
