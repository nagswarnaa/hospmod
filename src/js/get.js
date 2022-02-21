// import { doc, Firestore, getDoc } from "firebase/firestore";
// import { db, getAppts,  } from "../configs/firebase";

import { app, db } from "../configs/firebase";



export const check_patient_record = async app => {
    const _patients = []
    console.log(app.email)
    const patientsCollection = (await db.collection('patients').where('email', '==', app.email).get()).docs 
    console.log(patientsCollection)
    for(const patient of patientsCollection)
        _patients.push(patient.data())
    return _patients.length
}


export const getPatientsCollection = async () => {

    try{
        const _patients = []
        const patientsCollection = (await db.collection('patients').get()).docs 
        for(const patient of patientsCollection)
            _patients.push(patient.data())
    
        return _patients
    }catch(e){
        console.log("[ERR]@[getPatientsCollection]: ", e);
        return {error: e};
    }
}

export const get_doctors = async () => {
    const _doctors = []
    const doctorsCollection = (await db.collection('employess').where('type', '==', 'doctor').get()).docs 
    for(const doctor of doctorsCollection)
        _doctors.push(doctor.data())
    return _doctors
}


export const getEmployeesCollection = async () => {

    try{
        const _employees = []
        const employeesCollection = (await db.collection('employess').get()).docs 
        for(const employee of employeesCollection)
            _employees.push(employee.data())
    
        return _employees
    }catch(e){
        console.log("[ERR]@[getEmployeesCollection]: ", e);
        return {error: e};
    }
}

export const getLastAppointment = async patient => {
    try{
        const appointment = (
            await db.collection('appointments')
                .where('patient_ref', '==', patient.patient_ref)
                .orderBy('created_date', 'desc')
                .limit(1)
                .get()).docs 

        return appointment[0].data() || null

    }catch(e){
        console.log("[ERR]@[getLastAppointment]: ", e);
        return {error: e};
    }
}

export const get_all_Appointments = async () => {
    const _appointments = []
    const appointmentsCollection = (await db.collection('appointments').get()).docs 
    for(const appointment of appointmentsCollection)
        _appointments.push(appointment.data())
    return _appointments
}

export const get_pending_Appointments = async () => {
    const _appointments = []
    const appointmentsCollection = (await db.collection('appointments').where('status', '==', 'pending').get()).docs 
    for(const appointment of appointmentsCollection)
        _appointments.push(appointment.data())
    return _appointments
}

export const get_scheduled_Appointments = async () => {
    const _appointments = []
    const appointmentsCollection = (await db.collection('appointments').where('status', '==', 'scheduled').get()).docs 
    for(const appointment of appointmentsCollection)
        _appointments.push(appointment.data())
    return _appointments
}
export const GET = async (url, body) => {
    
    try{
        return fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }//,
            // body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then(obj => obj)
            .catch(error => console.log("\n[ERR]  @  [GET]  @  [URL:: " + url + "]\n[ERROR::MSG]:\n", error))
    }catch(e){
        console.log("[ERR]@[GET]: ", e);
        return {error: e};
    }
};