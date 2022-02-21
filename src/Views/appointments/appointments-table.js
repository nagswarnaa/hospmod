import { generateRandom_ID, getOnlyDate, getTime } from "../../js/utils";
import FlatList from 'flatlist-react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import Popup from './Popup';
import ActionButton from "../components/action-button"
import { check_patient_record, get_doctors } from "../../js/get";
import { createNewPatient, reject_appointment_status, schedule_appointment_status } from "../../js/post";
import { Button } from '@material-ui/core';



const AppointmentsTable = ({ appointments }) => {


    return (

        <div className={`table-container center-hv`}>
            <div className={`row-container`} key={generateRandom_ID()}>
                <>
                    <div className={`font-lable-m table-cell`} style={{ fontWeight: 500 }}>{`PATIENT NAME`}</div>
                    <div className={`font-lable-m table-cell`} style={{ fontWeight: 500 }}>{`EMAIL`}</div>
                    <div className={`font-lable-m table-cell`} style={{ fontWeight: 500 }}>{`DOCTOR NAME`}</div>
                    <div className={`font-lable-m table-cell`} style={{ fontWeight: 500 }}>{`TIME`}</div>
                    <div className={`font-lable-m table-cell`} style={{ fontWeight: 500 }}>{`STATUS`}</div>
                    <div className={`font-lable-m table-cell`} style={{ fontWeight: 500 }}></div>


                </>
            </div>
            {appointments.length > 0 &&

                <FlatList
                    list={appointments}
                    key={generateRandom_ID()}
                    renderItem={appointment => {

                        return (
                            <div className={`row-container`} key={generateRandom_ID()}>
                                <PatientRow {...{ appointment }} />
                            </div>
                        );
                    }}
                />
            }
        </div>

    )
}

const PatientRow = ({ appointment }) => {
    const [isOpen, setIsOpen] = useState(false);



    const app = {
        f_name: appointment.f_name,
        l_name: appointment.l_name,
        email: appointment.email,
        //dob: getOnlyDate(appointment.dob),
        dob: appointment.dob,
        phone: appointment.phone
    }

    const appointment_reference = {
        id: appointment.appointment_ref,
        type: appointment.type

    }
    const togglePopup = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)
        if (isOpen === true) {

            window.location.reload()
        }

    }
    const [state, setState] = useState({
        doctor: appointment.doctor_name
    })

    const request_doctor = e => {

        console.log("Event: ", e.target);
        setState({ ...state, [e.target.name]: e.target.value })
        state.doctor = e.target.value

    }


    const view_doctor = async () => {

        const _doctors = []
        const doctorsCollection = await get_doctors()
        for (const doctor of doctorsCollection)
            _doctors.push(doctor.f_name)
        state.doctor = _doctors[0]

        const element =
            <div>
                {
                    <select name={'doctor'} onChange={request_doctor}>

                        {_doctors.map((val) => (
                            <option value={val} >{val}</option>
                        ))}

                    </select>
                /* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        Select Doctor
                    </DropdownToggle>
                    <DropdownMenu>
                        {_doctors.map((val) => (
                            <DropdownItem onClick={() => setState(val)}>{val}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown> */}
            </div>

        ReactDOM.render(element, document.getElementById("view"))

    }
    const schedule = async (app, appointment_reference, doctor) => {
        if (doctor === "General Appointment") {
            alert("Please select a doctor to schedule the appointment")
        }



        else {
            const count = await check_patient_record(app)
            if (count >= 1) {
                console.log("Patient record already exists")

            }
            else {

                createNewPatient(app)
            }
            schedule_appointment_status(appointment_reference, doctor)
            alert("Appointment Successfully Scheduled")
        }


    }
    const reject = async (appointment_reference) => {

        reject_appointment_status(appointment_reference)
        alert("Appointment Rejected")
    }

    if (appointment.doctor_name == null) {
        appointment.doctor_name = "General Appointment"
    }
    return (
        <>
            <div className={`font-lable-m table-cell`}>{`${appointment.f_name} ${appointment.l_name}`}</div>
            <div className={`font-lable-m table-cell`}>{`${appointment.email}`}</div>
            <div className={`font-lable-m table-cell`}>{`${appointment.doctor_name}`}</div>
            <div className={`font-lable-m table-cell`}>{`${appointment.from_date} ${appointment.from_time} - ${appointment.to_date} ${appointment.to_time}`}</div>
            <div className={`font-lable-m table-cell`}>{`${appointment.status}`}</div>
            <div className={`font-lable-m table-cell`}><Button variant="contained" color="primary" onClick={togglePopup}>View More</Button></div>



            {isOpen && <Popup content={<>
                <form align="center">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Doctor Requested</th>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                        <tr>
                            <td>{`${appointment.f_name} ${appointment.l_name}`}</td>
                            <td>{appointment.dob}</td>
                            <td>{`${appointment.email}`}</td>
                            <td>{`${appointment.phone}`}</td>
                            <td>{`${appointment.doctor_name}`}</td>
                            <td>{`${appointment.from_date} ${appointment.from_time}`}</td>
                            <td>{`${appointment.to_date} ${appointment.to_time}`}</td>
                        </tr>
                    </table>
                    <br></br> <br></br>
                    {/* <label>Name: {`${appointment.f_name} ${appointment.l_name}`}</label><br></br>
                    <label>Date of Birth: {getOnlyDate(appointment.dob)}</label><br></br>
                    <label>Email: {`${appointment.email}`}</label><br></br>
                    <label>Doctor Requested: {`${appointment.doctor_name}`}</label><br></br>
                    <label>Appointment Time: {`${getOnlyDate(appointment.time)} ${getTime(appointment.time)}`}</label> */}
                    {
                        appointment.type === "general" && appointment.doctor_name === "General Appointment" &&
                        [
                            <br></br>, <br></br>,
                            <ActionButton
                                className={`button`}
                                title={'View Doctors'}
                                action={() => view_doctor()}
                                name={'view_doctor'}

                            />,

                            <div id="view">

                            </div>,
                            <br></br>, <br></br>, <br></br>,
                        ]
                    }
                    {appointment.status === "pending" &&

                        [
                            <ActionButton
                                className={`button`}
                                title={'Schedule Appointment'}
                                action={() => schedule(app, appointment_reference, state.doctor)}
                                name={'schedule'}

                            />,
                            <ActionButton
                                className={`button`}
                                position="relative"
                                title={'Reject Appointment'}
                                action={() => reject(appointment_reference)}
                                name={'reject'}

                            />,

                        ]

                    }

                </form>
            </>}
                handleClose={togglePopup}
            />}

        </>
    )

}

export default AppointmentsTable;
