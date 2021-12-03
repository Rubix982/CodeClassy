import { actionTypes } from "../actionTypes/actionTypes"
import axios from 'axios'

export const registerUserAction = (formData) => {
    //This inner function is a middleware function to post new user data for registration.
    return async (dispatch) => { 
        try{
            await axios.post("http://localhost:5000/auth/signup", formData);
            dispatch( { type: actionTypes.registerUserSuccess, payload: {successMessage: 'User Registered Successfully!' }});
        }
        catch(error)
        {
            dispatch({ type: actionTypes.registerUserFailed, payload: { errorMessage: error } })
        }
    }
}

