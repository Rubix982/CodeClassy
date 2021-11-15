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


const RegisterForm= () =>
{
    const [role, setRole] = useState('Role');

    const handleChange = (event) => {
        setRole(event.target.value);
      };

    return(
        <div className={RegisterFormStyling.container}>
            <div className={RegisterFormStyling.form}>

                <div className={RegisterFormStyling.leftform}>

                    <div className={RegisterFormStyling.leftformheader}>
                        <h2> Codeclassy</h2>
                        <h1> Create your Codeclassy Account</h1>
                    </div>



                    <div className={RegisterFormStyling.leftforminputs}>
                        <div className={RegisterFormStyling.textinput}>
                            <TextField required label="Full name" id="outlined-size-small" size="small" />
                        </div>

                        <div className={RegisterFormStyling.textinput}>
                            <TextField fullWidth required label="Email" id="outlined-size-small" size="small" />
                        </div>

                        <div className={RegisterFormStyling.textinput}>
                            <TextField type="password" required label="Password" id="outlined-size-small" size="small" />
                        </div>

                        <div className={RegisterFormStyling.textinput}>
                            <TextField type="password" required label="Confirm password" id="outlined-size-small" size="small" />
                        </div>

                        <div className={RegisterFormStyling.roledropdown}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                label="Role"
                                onChange={handleChange}
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
                            <button className={RegisterFormStyling.register}> Sign up </button>
                        </div>

                    </div>

                </div>

                
                <div className={RegisterFormStyling.rightform}>
                    <Image height={200} width={300} src={RegisterImage} alt='Registration-image'/>
                    <h2> Let's get started.</h2>
                </div>
                
            </div>
        </div>
    )
}

export default RegisterForm