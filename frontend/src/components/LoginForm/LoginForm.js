import React from 'react'
import LoginFormStyling from '../../../styles/LoginForm/LoginForm.module.css'
import { Grid,Paper, Link } from '@material-ui/core'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const LoginForm= () =>
{
    const paperStyle={padding :20,height:'80vh',width:500, margin:"10vh auto"}
    return(
        <Grid>
            <Paper elevation={15} style={paperStyle}>
                <Grid align='center'>
                    <h1 className={LoginFormStyling.mainheading}> CodeClassy </h1>
                    <h3 className={LoginFormStyling.subheading}>Let's get started.</h3>
                </Grid>

                <TextField style={{ marginTop: '5%', borderColor: 'white' }} required id="outlined-required" label="Email" placeholder='Email'
                fullWidth/>

                <TextField className={LoginFormStyling.textbox} required id="outlined-password-input" label="Password" placeholder='Password' 
                type='password' fullWidth
                />

                <div className={LoginFormStyling.forgetpassword}>
                    <Link style={{ textDecoration: 'none'}} href="#" >
                        Forgot password?
                    </Link>
                </div>

                <div className={LoginFormStyling.loginbuttoncontainer}>
                    <Button className={LoginFormStyling.loginbutton} type='submit' color='primary' variant="contained"  fullWidth>
                        Sign in
                    </Button>
                </div>

                <div className={LoginFormStyling.createaccount}>
                    <Link style={{ textDecoration: 'none'}} href="#" >
                        Create account 
                    </Link>
                </div>
            </Paper>
        </Grid>
    )
}

export default LoginForm