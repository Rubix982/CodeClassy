import { actionTypes } from "../actionTypes/actionTypes"
import axios from 'axios'
import Router from "next/router";

export const registerUserAction = (formData) => {
    return async (dispatch) => { 
        try{
            await axios.post("http://localhost:5000/auth/signup", formData);
            setSuccessStates(dispatch);
        }
        catch(error)
        {
            setErrorStates(dispatch, error.response.data.message[0])
        }
    }
}


const setSuccessStates = (dispatch) => {
    dispatch({ type: actionTypes.apiSuccess, 
        payload: {successMessage: 'User Registered Successfully!', successMessageSnackbarState: true }});
        setTimeout(
            () => {
                dispatch({ type: actionTypes.apiSuccess, 
                payload: {successMessage: '', successMessageSnackbarState: false }});
                Router.push('/login');
            },2000);
}


const setErrorStates = (dispatch, error) => {
    dispatch({ 
        type: actionTypes.apiFailed, 
        payload: { errorMessage: error, errorMessageSnackbarState: true } 
        });
    
        setTimeout(
            () => {
            dispatch({ 
            type: actionTypes.apiFailed, 
            payload: { errorMessage: '', errorMessageSnackbarState: false } 
            });
        },2000);
}
