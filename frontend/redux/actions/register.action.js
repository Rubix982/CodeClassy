import { actionTypes } from "../actionTypes/actionTypes"
import axios from 'axios'
import Router from "next/router";

export const registerUserAction = (formData) => {
    return async (dispatch) => { 
        try{
            await axios.post("http://localhost:5000/auth/signup", formData);
            dispatch( { type: actionTypes.registerUserSuccess, payload: {successMessage: 'User Registered Successfully!' }});
            dispatch( { type: actionTypes.successMessageSnackbarAction, payload: {successMessageSnackbarState: true}});
            setTimeout(
                () => {
                    dispatch( { type: actionTypes.successMessageSnackbarAction, payload: {successMessageSnackbarState: false}});
                    Router.push('/login');
                },4000);
        }
        catch(error)
        {
            dispatch({ type: actionTypes.registerUserFailed, payload: { errorMessage: error } })
        }
    }
}



