import { actionTypes } from "../actionTypes/actionTypes"
import axios from 'axios'

export const registerUserAction = (formData) => {
    //This inner function is a middleware function to post new user data for registration.
    return async (dispatch) => { 
        console.log("Called action");
        dispatch({ type: actionTypes.loading, loadingState: true });
        await axios.post("http://localhost:5000/auth/signup", formData)
        .then((response) => dispatch({ type: actionTypes.registerUserSuccess, successMessage: response.status}))  
        .catch((error) => dispatch({ type: actionTypes.registerUserFailed, errorMessage: error }))  
        dispatch({ type: actionTypes.loading, loadingState: false });
    }
}

