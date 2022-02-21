import { Radio, RadioGroup, FormControl,FormControlLabel,FormLabel } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { get_all_Appointments } from "../../js/get"
import { get_pending_Appointments } from "../../js/get";
import { get_scheduled_Appointments } from "../../js/get";
import AppointmentsTable from "./appointments-table"




const Appointments = ({}) => {

    const [appointments, setAppointments] = useState([])
    // useEffect(() => {

    //     const getAppointments = async () => {
    //         const _appointments = await get_all_Appointments()
    //         setAppointments(_appointments)
    //     }

    //     getAppointments()
    // }, [])

    const all_appointments = (e) => {
        e.preventDefault();
        const getAppointments = async () => {
            const _appointments = await get_all_Appointments()
            setAppointments(_appointments)
        }
        
            getAppointments()
        
       
    }

    const pending_appointments = (e) => {
        e.preventDefault();
        const getAppointments = async () => {
            const _appointments = await get_pending_Appointments()
            setAppointments(_appointments)
        }
        
            getAppointments()
        
    }

    const scheduled_appointments = (e) => {
        e.preventDefault();
        const getAppointments = async () => {
            const _appointments = await get_scheduled_Appointments()
            setAppointments(_appointments)
        }
            getAppointments()
        
        
    }
    return(
        <div className={`col ful-wh`}>
            <form>
            <h2 align="center">Appointments</h2><br></br><br></br>
            <div align = "center">
                <FormControl>
                <FormLabel id="Appointments"></FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="Appointments-group"
                >
                    <FormControlLabel value="all_appointments" onChange={all_appointments} control={<Radio />} label="All Appointments" />
                    <FormControlLabel value="pending_appointments" onChange={pending_appointments} control={<Radio />} label="Pending Appointments" />
                    <FormControlLabel value="scheduled_appointments" onChange={scheduled_appointments} control={<Radio />} label="Scheduled Appointments" />
                </RadioGroup>
                </FormControl>
            </div>
                       
            
            <AppointmentsTable {...{appointments}} />
            </form>
           
            
        </div>
    )
}

export default Appointments