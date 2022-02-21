import React, {useState} from 'react'
import {Avatar, Grid, Paper, TextField, Typography, Button, Link, InputAdornment, IconButton } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { Visibility, VisibilityOff } from '@material-ui/icons';


const Signup =({handleChange})=>{
    const paperStyle = { padding: '30px 20px', height:'33rem', width: 300, margin: "20px auto"}
    const handleOpen={margin:'20px auto', alignItems: 'center' }
    const avatarStyle={backgroundColor:'#37bbe8'}
    const [passwordShown, setPasswordShown] = useState(false)
    const togglePassword = () => { setPasswordShown(!passwordShown)}

    return(
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align = "center">
                <h2 style={{color: '#37bbe8'}}>SIGN UP <Avatar style = {avatarStyle}><LocalHospitalIcon/></Avatar>
                    <Typography variant='caption' gutterBottom>Please create an account!</Typography>
                </h2>
                </Grid>
                    <TextField fullWidth label = 'Name' placeholder="Enter your name" fullWidth required/>
                    <TextField fullWidth label = 'Email' placeholder="Enter your Email" fullWidth required/>
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
                    <TextField fullWidth label = 'Re-enter Password' placeholder="Re-Enter your Password" fullWidth required type={passwordShown ? "text" : "password"}
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
                    <Button variant="contained" color="primary" onClick={handleOpen} fullWidth style= {{marginTop: "2em" }}>Signup</Button>
                    <FormControlLabel 
                        control={<Checkbox name="checkedA" style={{color: '#37bbe8'}}/>}
                        label="I accept the terms and conditions."
                    />
                <Grid>
                <Typography> Do you have an account? 
                    <Link href="#" onClick = {()=>handleChange("event", 0)} style={{color: '#37bbe8' }}>
                    {' '} Go Back
                    </Link>
                </Typography>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Signup;