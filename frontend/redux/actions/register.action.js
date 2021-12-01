import { actionTypes } from "../actionTypes/actionTypes"
import axios from 'axios'

export const registerUserAction = async (data) => {
    //This inner function is a middleware function to post new user data for registration.
    return async (dispatch, getstate) => { 
        dispatch({ type: actionTypes.loading, loadingState: true });
        axios
        .post("http://localhost:5000/register", data)
        .then(() => dispatch({ type: actionTypes.registerUserSuccess, successMessage: 'User Registered Successfully!' }))  
        .catch((error) => dispatch({ type: actionTypes.registerUserFailed, errorMessage: error }))  
        dispatch({ type: actionTypes.loading, loadingState: false });
    }
}