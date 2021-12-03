import React from 'react'
import LoginFormStyling from '@styles/LoginForm/LoginForm.module.css'
import TextField from '@mui/material/TextField'
import Link from 'next/link'


const LoginForm= () =>
{
    return(
        <div className={LoginFormStyling.container}>

            <div className={LoginFormStyling.form}>

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
                        <TextField required id="outlined-required" label="Email" fullWidth />
                    </div>

                    <div className={LoginFormStyling.textinput}>
                        <TextField required id="outlined-required" label="Password" type="password" fullWidth />
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
                        <button className={LoginFormStyling.signin}> Sign in</button>
                    </div>
                    
                </div>

            </div>

        </div>
    )
}

export default LoginForm