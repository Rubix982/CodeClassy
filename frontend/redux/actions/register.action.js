import { actionTypes } from "../actionTypes/actionTypes"
import axios from 'axios'

export const registerUserAction = async (formData) => {
    //This inner function is a middleware function to post new user data for registration.
    return async (dispatch) => { 
        dispatch({ type: actionTypes.loading, loadingState: true });
        axios
        .post("http://localhost:5000/register", formData)
        .then(() => dispatch({ type: actionTypes.registerUserSuccess, successMessage: 'User Registered Successfully!' }))  
        .catch((error) => dispatch({ type: actionTypes.registerUserFailed, errorMessage: error }))  
        dispatch({ type: actionTypes.loading, loadingState: false });
    }
}