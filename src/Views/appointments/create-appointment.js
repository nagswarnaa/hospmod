import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import { get_doctors } from "../../js/get";
import ActionButton from "../components/action-button"
import { getOnlyDate, getTime } from "../../js/utils";
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
import { createNewAppointment } from "../../js/post";

const CreateAppointments = ({ }) => {

    const [appointment, setAppointment] = useState({
        f_name: null,
        l_name: null,
        email: null,
        phone: null,
        from_time: null,
        to_time: null,
        from_date: null,
        to_date: null,
        type: null,
        doctor_name: null,
        dob: null,
        status: "pending"
    })
    const view_doctor = async () => {
        appointment.type = "specific"
        var _doctors = []
        const doctorsCollection = await get_doctors()
        for (const doctor of doctorsCollection)
            _doctors.push(doctor.f_name)
        appointment.doctor_name = _doctors[0]
        const element =
            <div>
                {
                    <select className="doctor_name" name="doctor_name" val={appointment.doctor_name} onChange={handleAppointmentChange}>

                        {_doctors.map((val) => (
                            <option value={val} >{val}</option>
                        ))}

                    </select>
                }
            </div>

        ReactDOM.render(element, document.getElementById("doctor_list"))

    }
    const specific_doctor = () => {

        const element =
            <div>
                <ActionButton
                    className={`button`}
                    title={'Select Doctor'}
                    action={() => view_doctor()}
                    name={'view_doctor'}

                />
            </div>
        ReactDOM.render(element, document.getElementById("non-general"))
    }

    const handleAppointmentChange = e => {
        console.log(appointment.from_time)

        setAppointment({ ...appointment, [e.target.name]: e.target.value })
    }
    const min_time = () => {
        var d = new Date()
        var year = d.getFullYear()
        var month = "0" + (d.getMonth() + 1)
        var date = "0" + d.getDate()
        var hours = "0" + d.getHours()
        var minutes = "0" + d.getMinutes()
        var result = year + '-' + month.substr(-2) + '-' + date.substr(-2) + "T" + hours.substr(-2) + ":" + minutes.substr(-2);
        console.log(result)
        return result
    }


    return (
        <>
            <h1 align="center">Schedule an Appointment</h1>
            <div class="container">

                <form>



                    <label for="fname">First Name</label>
                    <input onChange={handleAppointmentChange} val={appointment.f_name} type="text" required id="fname" name={'f_name'} placeholder="Your first name.." />

                    <label for="lname">Last Name</label>
                    <input onChange={handleAppointmentChange} val={appointment.l_name} type="text" required id="lname" name={'l_name'} placeholder="Your last name.." />


                    <label for="email">Email</label>
                    <input onChange={handleAppointmentChange} val={appointment.email} type="email" required id="email" name={'email'} placeholder="Your email.." />

                    <label for="phone">Mobile No.</label>
                    <input onChange={handleAppointmentChange} val={appointment.phone} type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required id="phone" name={'phone'} placeholder="Your phone no in format 123-456-6789" />

                    <label for="dob">Date of Birth</label>
                    <input onChange={handleAppointmentChange} val={appointment.dob} max={min_time().substr(0, 10)} type="date" required id="dob" name={'dob'} placeholder="Your date of birth.." />

                    <label for="from_time">Appointment Time</label><br></br><br></br>
                    <label for="from_time">From</label>
                    <input onChange={handleAppointmentChange} val={appointment.from_time} type="datetime-local" required min={min_time()} id="from_time" name={'from_time'} placeholder="Select appointment time.." />

                    <label for="to_time">To</label>
                    <input onChange={handleAppointmentChange} val={appointment.to_time} type="datetime-local" required min={appointment.from_time} id="to_time" name={'to_time'} placeholder="Select appointment time.." />


                    <label for="type">Appointment Type</label><br></br>
                    <FormControl>
                        <FormLabel id="type"></FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="type"
                        >
                            <FormControlLabel value="general" onChange={handleAppointmentChange} control={<Radio />} label="General" />
                            <FormControlLabel value="specific_doctor" onChange={specific_doctor} control={<Radio />} label="Specific Doctor" />

                        </RadioGroup>
                    </FormControl><br></br>
                    <div id="non-general">

                    </div>

                    <div id="doctor_list">

                    </div>

                    <br></br><br></br>
                    <div align="center" style={{ width: '70%' }}>


                        <input onClick={() => submit(appointment)} type="submit" value="Submit"></input>
                    </div>
                </form>
            </div>
        </>
    )
}

const submit = async (appointment) => {

    if (appointment.f_name === null || appointment.l_name === null || appointment.email === null || appointment.phone === null || appointment.from_time === null || appointment.to_time === null || appointment.type === null || appointment.dob === null) {
        console.log(appointment)
        alert("Please fill all the required fields")
    }
    else {
        appointment.dob = appointment.dob.slice(0, 10)
        appointment.from_date = appointment.from_time.slice(0, 10)
        appointment.from_time = appointment.from_time.slice(-5)

        appointment.to_date = appointment.to_time.slice(0, 10)
        appointment.to_time = appointment.to_time.slice(-5)
        if (appointment.type === "general") {
            appointment.doctor_name = null
        }

        createNewAppointment(appointment)
        alert("Appointment successfully scheduled!!!")
    }


}


export default CreateAppointments
