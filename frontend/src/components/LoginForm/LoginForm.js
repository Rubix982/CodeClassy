import React , { useState } from 'react'
import LoginFormStyling from '../../../styles/LoginForm/LoginForm.module.css'
import TextField from '@mui/material/TextField'
import Link from 'next/link'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// redux imports
import { connect } from "react-redux";
import { loginUserAction } from "../../../redux/actions/login.action";




const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginForm= (props) =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = (event) => {
        event.preventDefault();
        if( (email == '') || (password == '') ){
            alert(`Please fill all the required fields!`);
        }
        else{
            const credentials = {
                email: email,
                password: password
            };
            props.loginUserAction(credentials);
        }
    }


    return(
        <>
            { props.successMessageSnackbar && 
                <Snackbar open={true} autoHideDuration={3000}>
                    <Alert severity="success" sx={{ width: '100%' }}>
                        {props.responseMessage}
                    </Alert>
                </Snackbar>
            }

            { props.errorMessageSnackbar && 
                <Snackbar open={true} autoHideDuration={3000}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {props.responseMessage}
                    </Alert>
                </Snackbar>
            }

            <div className={LoginFormStyling.container}>

                <form action='/login' method='POST' className={LoginFormStyling.form}>

                    <div className={LoginFormStyling.formheader}>

                        <h1 className={LoginFormStyling.logo}>
                            Codeclassy
                        </h1>

                        <h2>
                            Sign in
                        </h2>

                        <h3>
                            Use your Codeclassy Account
                        </h3>

                    </div>

                    <div className={LoginFormStyling.inputs}>

                        <div className={LoginFormStyling.textinput}>
                            <TextField 
                            inputProps={{
                                autoComplete: 'on'
                                }}
                            value={email}
                            onChange={ e => setEmail(e.target.value)}
                            required 
                            label="Email" 
                            fullWidth />
                        </div>

                        <div className={LoginFormStyling.textinput}>
                            <TextField 
                            inputProps={{
                                autoComplete: 'off'
                            }}
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                            required
                            label="Password" 
                            type="password" 
                            fullWidth />
                        </div>

                        <Link href="/forgotpassword">
                            <a className={LoginFormStyling.forgetpassword}> Forgot password? </a>
                        </Link>

                    </div>

                    <div className={LoginFormStyling.formfooter}>
                        
                        <div className={LoginFormStyling.formfooterleft}>
                            <Link href="/register">
                                <a className={LoginFormStyling.createaccount}> Create account </a>
                            </Link>
                        </div>

                        <div className={LoginFormStyling.formfooterright}>
                            <button 
                            type='Submit'
                            onClick={loginUser}
                            className={LoginFormStyling.signin}> 
                                Sign in
                            </button>
                        </div>
                        
                    </div>

                </form>

            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        responseMessage: state.apiReducer.responseMessage,
        successMessageSnackbar: state.apiReducer.successMessageSnackbar,
        errorMessageSnackbar: state.apiReducer.errorMessageSnackbar
    }
};

export default connect(mapStateToProps, {loginUserAction})(LoginForm);
