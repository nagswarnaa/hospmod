import React, { useState } from 'react'
import {Avatar, Button, Grid,Paper, TextField, Typography, Link, InputAdornment, IconButton} from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { fake_db_generator } from '../../js/post';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import NewPatientRegistration from '../patients/new-patient-registration';


const Login_here=({handleChange})=>{
    const paperStyle={padding :20, height:'27rem', width:280, margin:"20px auto"}
    const Buttonstyle={margin:'10px 0'}
    const avatarStyle={backgroundColor:'#37bbe8'}
    const [passwordShown, setPasswordShown] = useState(false)
    const togglePassword = () => { setPasswordShown(!passwordShown)}

    return (
        <Grid>
            <Paper evaluation={10} style={paperStyle}>
                <Grid align = 'center'>
                <h2 style={{color: '#37bbe8'}}>sign in <Avatar style = {avatarStyle}><LocalHospitalIcon/></Avatar>
                </h2>
                </Grid>
                <TextField label = 'Username' placeholder='Please enter username' fullWidth required/>
                <TextField label = 'Password' placeholder='Please enter Password' type={passwordShown ? "text" : "password"} fullWidth required
                    InputProps={{ 
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePassword}
                            >
                            {passwordShown ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        )
                    }}
                />
                {/* <button style={{outline: 'none'}} onClick={togglePassword}>Show Password</button> */}
                <Button type ='submit' color = 'primary' variant = 'contained' style = {Buttonstyle} fullWidth style= {{marginTop: "2em" }}>Sign in</Button>
                <Grid align = 'center'>
                <Typography style={{marginTop: '2rem'}}>
                    <Link  href="#" margin = 'px 0' style={{color: '#37bbe8', }}>
                    Forgot Password?
                    </ Link>
                </Typography>
                <Typography> Do you have an account? 
                    <Link href="#" onClick = {()=>handleChange("event",1)} style={{color: '#37bbe8'}}>
                    &nbsp; Sign Up?
                    </Link>
                </Typography>
                </Grid>
            </Paper>

            <NewPatientRegistration />
        </Grid>        
      );
    }

export default Login_here

