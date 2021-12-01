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

// redux imports
import { connect, useDispatch } from "react-redux";
import { registerUserAction } from "../../../redux/actions/register.action";
  


const RegisterForm= (props) =>
{
    const dispatch = useDispatch();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');

    const registerUser = () => {
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
            console.log(`${formData}`);
            dispatch(registerUserAction(formData));
            alert(`${props.responseMessage}`);
        }
    }

    if(props.loading){
        return(
            <div> ... Loading ...</div>
            // loading gif component here
        )
    }
    else{
        return(
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
                                value={fullName} 
                                onChange={ e => setFullName(e.target.value)}
                                required 
                                label="Full name" 
                                id="outlined-size-small" 
                                size="small" />
                            </div>
    
                            <div className={RegisterFormStyling.textinput}>
                                <TextField 
                                value={email}
                                onChange={ e => setEmail(e.target.value)}
                                fullWidth 
                                required 
                                label="Email" 
                                id="outlined-size-small" 
                                size="small" />
                            </div>
    
                            <div className={RegisterFormStyling.textinput}>
                                <TextField 
                                value={password}
                                onChange={ e => setPassword(e.target.value)}
                                type="password" 
                                required 
                                label="Password" 
                                id="outlined-size-small" 
                                size="small" />
                            </div>
    
                            <div className={RegisterFormStyling.textinput}>
                                <TextField 
                                value={confirmPassword}
                                onChange={ e => setConfirmPassword(e.target.value)}
                                type="password" 
                                required 
                                label="Confirm password" 
                                id="outlined-size-small" 
                                size="small" />
                            </div>
    
                            <div className={RegisterFormStyling.roledropdown}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
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
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state };
};

export default connect(mapStateToProps)(RegisterForm);
