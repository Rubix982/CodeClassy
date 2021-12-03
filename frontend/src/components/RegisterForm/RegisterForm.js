import React , { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import RegisterImage from '../../../public/assets/images/register-image.svg'
import RegisterFormStyling from '../../../styles/RegisterForm/RegisterForm.module.css'
import { SnackbarProvider} from 'notistack';

// redux imports
import { connect } from "react-redux";
import { registerUserAction } from "../../../redux/actions/register.action";
  


const RegisterForm= (props) =>
{

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');

    

    const registerUser = (event) => {
        event.preventDefault();
        if( (fullName == null) || (email == null) || (password == null) || (confirmPassword == null) || (role == null) ){
            alert(`Please fill all the required fields!`);
        }
        else{
            const formData = {
                fullName: fullName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                role: role
            };
            props.registerUserAction(formData);
        }
    }


    return(
        <>
            { props.responseMessage == 'User Registered Successfully!' &&
                <SnackbarProvider 
                maxSnack={1}         
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                autoHideDuration={5000}
                message={props.responseMessage}/>
            }
            <div className={RegisterFormStyling.container}>
                <div className={RegisterFormStyling.form}>

                    <form action='/register' method='POST' className={RegisterFormStyling.leftform}>

                        <div className={RegisterFormStyling.leftformheader}>
                            <h2> Codeclassy</h2>
                            <h1> Create your Codeclassy Account</h1>
                        </div>



                        <div className={RegisterFormStyling.leftforminputs}>
                            <div className={RegisterFormStyling.textinput}>
                                <TextField 
                                inputProps={{
                                    autoComplete: 'on'
                                    }}
                                value={fullName} 
                                onChange={ e => setFullName(e.target.value)}
                                required 
                                label="Full name" 
                                size="small" />
                            </div>

                            <div className={RegisterFormStyling.textinput}>
                                <TextField 
                                inputProps={{
                                    autoComplete: 'on'
                                    }}
                                value={email}
                                onChange={ e => setEmail(e.target.value)}
                                fullWidth 
                                required 
                                label="Email" 
                                size="small" />
                            </div>

                            <div className={RegisterFormStyling.textinput}>
                                <TextField 
                                inputProps={{
                                    autoComplete: 'on'
                                }}
                                value={password}
                                onChange={ e => setPassword(e.target.value)}
                                type="password" 
                                required 
                                label="Password" 
                                size="small" />
                            </div>

                            <div className={RegisterFormStyling.textinput}>
                                <TextField 
                                inputProps={{
                                    autoComplete: 'on'
                                    }}
                                value={confirmPassword}
                                onChange={ e => setConfirmPassword(e.target.value)}
                                type="password" 
                                required 
                                label="Confirm password" 
                                size="small" />
                            </div>

                            <div className={RegisterFormStyling.roledropdown}>
                                <FormControl fullWidth>
                                    <InputLabel >Role</InputLabel>
                                    <Select
                                    value={role}
                                    label="Role"
                                    onChange={ e => setRole(e.target.value)}
                                    >
                                        <MenuItem value={"Teacher"}>Teacher</MenuItem>
                                        <MenuItem value={"Student"}>Student</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>
                            
                        </div>


                        <div className={RegisterFormStyling.leftformfooter}>

                            <div className={RegisterFormStyling.leftformfooterleft}>
                                <Link href="/login">
                                    <a className={RegisterFormStyling.signin}> Sign in instead </a>
                                </Link>
                            </div>

                            <div className={RegisterFormStyling.leftformfooterright}>
                                <button 
                                type='Submit'
                                onClick={registerUser}
                                className={RegisterFormStyling.register}
                                > 
                                Sign up 
                                </button>
                            </div>

                        </div>

                    </form>





                    
                    <div className={RegisterFormStyling.rightform}>
                        <Image height={200} width={300} src={RegisterImage} alt='Registration-image'/>
                        <h2> Let's get started.</h2>
                    </div>
                    
                </div>
            </div>
        </>
    )

}

const mapStateToProps = (state) => {
    return {responseMessage: state.registerReducer.responseMessage}
};

export default connect(mapStateToProps, {registerUserAction})(RegisterForm);
