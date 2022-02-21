import { db } from "../configs/firebase"
import { COLLECTIONS, DBS } from "./constants"
import { log, logError, validateObject } from "./utils";

export const registarNewPatient = async (patient) => {

    // user_ref = oQqvBZs9RTuzqXbLDKwd
    // pateint_ref = DV1FOycVM8ebfNnQ3zrY

    log("PAT-REG: ", patient)

    try{
        const user_ref = db.doc(`users/${patient.user_ref}`);
        const pateint_ref = db.doc(`patients/${patient.pateint_ref}`);

        const {f_name, l_name, mobile, ssn, address, city, state, zip_code, gender, 
            blood_type, past_surgeries, past_diseases, past_alergies, height, weight, emergency_name, emergency_phone, 
            emergency_relationship, insurance_name, insurance_policy, insurance_group, insurance_phone} = patient
        
        let user_obj =  { f_name, l_name, mobile, ssn, address, city, state, zip_code, gender, dob: new Date(patient.dob)}
        let patient_obj =  { blood_type, 
            past_surgeries: past_surgeries.length > 0 && past_surgeries.includes(",") ? past_surgeries.split(",") : past_surgeries , 
            past_diseases: past_diseases.length > 0 && past_diseases.includes(",") ? past_diseases.split(",") : past_diseases , 
            past_alergies: past_alergies.length > 0 && past_alergies.includes(",") ? past_alergies.split(",") : past_alergies , 
            height, weight, emergency_name, emergency_phone, emergency_relationship, insurance_name, insurance_policy, insurance_group, insurance_phone}

        validateObject(user_obj)
        validateObject(patient_obj)
        
        const batch = db.batch()
        batch.update(user_ref, user_obj)
        batch.update(pateint_ref, patient_obj) 
        await batch.commit()

        return true
        
    }catch(e){
        logError("registarNewPatient", e)
        return false
    }
}


export const createNewPatient = async (user) => {

    try{
        const user_ref = db.collection('users').doc();
        const pateint_ref = db.collection('pateints').doc();

        let user_obj =  {
            join_date: new Date(),
            user_ref: user_ref.id,
            user_type: 'patient',
            is_employee: false,
            patient_ref: pateint_ref.id,
            email: user.email,
            f_name: user.name,
        }

        let patient_obj =  {
            user_ref: user_ref.id,
            patient_ref: pateint_ref.id,
        }

        validateObject(user_obj)
        validateObject(patient_obj)
        
        const batch = db.batch()
        batch.set(user_ref, user_obj)
        batch.set(pateint_ref, patient_obj)

        await batch.commit()
        
    }catch(e){
        logError("createNewPatient", e)
    }
}

// export const createNewPatient = async (app) => {

//     try{
//         const patient_ref = db.collection('patients').doc();
//         let patient_obj = Object.assign(app,{
//             join_date: new Date(),
//             patient_ref: patient_ref.id
//         })
//         validateObject(patient_obj)
//         patient_ref.set(patient_obj)
        
//     }catch(e){
//         logError("createNewPatient", e)
//     }
// }

export const schedule_appointment_status = async (appointment_reference,doctor) => {

    try{
        db.collection("appointments").doc(appointment_reference.id).update({
            "status": "scheduled",
            "doctor_name": doctor
        });
        console.log(appointment_reference)
        
        
    }catch(e){
        logError("schedule_appintment_status", e)
    }
}

export const reject_appointment_status = async (appointment_reference) => {

    try{
        db.collection("appointments").doc(appointment_reference.id).update({
            "status": "rejected"
        });
        console.log(appointment_reference)
        
        
    }catch(e){
        logError("reject_appintment_status", e)
    }
}

export const createNewAppointment = async (appointment) => {

    try{
        const appointment_ref = db.collection('appointments').doc();
        let appointment_obj = Object.assign(appointment, {
            appointment_ref: appointment_ref.id
        })
        validateObject(appointment_obj)
        appointment_ref.set(appointment_obj)
        
    }catch(e){
        logError("createNewAppointment", e)
    }
}

export const createNewEmployee = async (employee) => {

    try{
        const employee_ref = db.collection('employess').doc();
        let employee_obj = Object.assign(employee, {
            join_date: new Date(),
            employee_ref: employee_ref.id
        })
        validateObject(employee_obj)
        employee_ref.set(employee_obj)
        
    }catch(e){
        logError("createNewEmployee", e)
    }
}

export const createNewPrescription = async ({prescription, lastAppointment,}) => {
    try{

        const batch = db.batch()
        const prescription_ref = db.collection(`${DBS.PATIENTS}/${lastAppointment.patient_ref}/${DBS.PRESCRIPTIONS}`).doc()
        let prescription_object = {
            prescription_ref: prescription_ref.id,
            date: new Date(),
            patient_ref: lastAppointment.patient_ref,
            doctor_ref: lastAppointment.docotr_ref,
            appointment_ref: lastAppointment.appointment_ref,
        } 

        validateObject(prescription_object)
        batch.set(prescription_ref, prescription_object)

        Object.values(prescription.medications).map(p => {
            const _obj = {}
            Object.keys(p).map(k => {
                if(k.includes('name')) _obj.name = p[k]
                if(k.includes('uses')) _obj.uses = p[k]
                if(k.includes('directions')) _obj.directions = p[k]
            }) 

            const medication_ref = db.collection(`${DBS.PATIENTS}/${lastAppointment.patient_ref}/${DBS.PRESCRIPTIONS}/${prescription_ref.id}/${DBS.MEDICATIONS}`).doc()
            let medication_object = Object.assign(_obj, {
                prescription_ref: prescription_ref.id,
                medication_ref: medication_ref.id,
                patient_ref: lastAppointment.patient_ref,
                doctor_ref: lastAppointment.docotr_ref,
                appointment_ref: lastAppointment.appointment_ref,
            })

            validateObject(medication_object)
            batch.set(medication_ref, medication_object)
        })

        await batch.commit()
        return true

    }catch(e){
        logError("createNewPrescriptions", e)
        return false
    }
}

const writePrescriptions = async (prescription) => {

    const arr = [
        {
            'prescription_ref': '',
            'date': '',
            'patient_ref': '',
            'patient_name': '',
            'doctor_name': '',
            'doctor_ref': '',
            'medications': {
                'prescription_ref': '',
                'medication_ref': '',
                'patient_ref': '',
                'patient_name': '',
                'doctor_name': '',
                'doctor_ref': '',
                'medication_name': '',
                'cost': '',
                'uses': '',
                'directions': ''
            },
        },
    ]

    const batch = db.batch()
    const patient_ref = db.doc(`${COLLECTIONS.PATIENTS}/${prescription.patient_ref}`)
    const prescription_ref = patient_ref.collection(`${COLLECTIONS.PRESCRIPTIONS}`).doc() 

    let prescription_obj = {
        description: prescription.description,
        
    }
    
    
    
    //db.collection(`${COLLECTIONS.PATIENTS}/${prescription.patient_ref}/${COLLECTIONS.PRESCRIPTIONS}`).doc()
}
 
export const fake_db_generator = async () => {

    const patients = [
        constructPatient('John', 'JJ', '05-30-1996', db.collection('patients').doc(), '4804445555', 'abc@def.com'),
        constructPatient('Turki', 'Bashah', '05-30-1999', db.collection('patients').doc(), '4804466655', 'kjh@def.com'),
        constructPatient('Aron', 'Mayers', '05-30-1991', db.collection('patients').doc(), '4804445888', 'lop@def.com'),
    ]

    const employess = [
        constructEmployee(db.collection('employess').doc(), 'Roshan', 'Ryanz', '02-22-1975', '12-10-2013', 'General Doctor', 'Physicians', 'doctor'),
        constructEmployee(db.collection('employess').doc(), 'Costaz', 'Econ', '04-24-1970', '12-14-2014', 'Hospital Staff', 'Managment', 'hospital-staff'),
        constructEmployee(db.collection('employess').doc(), 'Randi', 'Rollen', '01-12-1995', '12-10-2018', 'Lab Staff', 'Lab', 'lab-staff'),
        constructEmployee(db.collection('employess').doc(), 'Jacob', 'Jones', '01-12-1965', '12-10-2008', 'System Admin', 'Managment', 'admin'),
    ]

    const appointments = [
        constructAppointment(patients[0].f_name, patients[0].l_name, patients[0].dob, '15:30', 'confirmed', employess[0].l_name, 
        employess[0].employee_ref.id, employess[1].employee_ref.id, employess[0].l_name, 550, 'general', patients[0].patient_ref.id, db.collection('appointments').doc()),

        constructAppointment(patients[1].f_name, patients[1].l_name, patients[1].dob, '15:30', 'confirmed', employess[0].l_name, 
        employess[0].employee_ref.id, employess[1].employee_ref.id, employess[0].l_name, 550, 'general', patients[1].patient_ref.id, db.collection('appointments').doc()),

        constructAppointment(patients[2].f_name, patients[2].l_name, patients[2].dob, '15:30', 'confirmed', employess[0].l_name, 
        employess[0].employee_ref.id, employess[1].employee_ref.id, employess[0].l_name, 550, 'general', patients[2].patient_ref.id, db.collection('appointments').doc()),
    ]

    const visits = [
        constructVisit(appointments[0].appointment_ref.id, appointments[0].created_date, db.collection(`patients/${appointments[0].patient_ref}/visits`).doc(), appointments[0].patient_ref),
        constructVisit(appointments[1].appointment_ref.id, appointments[1].created_date, db.collection(`patients/${appointments[1].patient_ref}/visits`).doc(), appointments[1].patient_ref),
        constructVisit(appointments[2].appointment_ref.id, appointments[2].created_date, db.collection(`patients/${appointments[2].patient_ref}/visits`).doc(), appointments[2].patient_ref),
    ]

    const batch = db.batch()

    for(const o of patients) batch.set(o.patient_ref, Object.assign(o, {patient_ref: o.patient_ref.id}))
    for(const o of employess) batch.set(o.employee_ref, Object.assign(o,{ employee_ref: o.employee_ref.id}))
    for(const o of appointments) batch.set(o.appointment_ref, Object.assign(o,{ appointment_ref: o.appointment_ref.id}))
    for(const o of visits) batch.set(o.visit_ref, Object.assign(o,{ visit_ref: o.visit_ref.id}))

    // console.log("COMMITING");
    // await batch.commit()
    return true

}

const constructVisit = (appointment_ref, date, visit_ref, patient_ref) => {
    return {
        'appointment_ref': appointment_ref,
        'date': new Date(date),
        'visit_ref': visit_ref,
        'patient_ref': patient_ref,
    }
}
const constructEmployee = ( employee_ref, f_name, l_name, dob, join_date, title, department, type ) => {
    return {
        'employee_ref': employee_ref,
        'f_name': f_name,
        'l_name': l_name,
        'dob': new Date(dob),
        'join_date': new Date(join_date),
        'title': title,
        'department': department,
        'type': type,
    }
}
const constructPatient = (f_name, l_name, dob, patient_ref, mobile, email) => {
    return {
    
        'f_name': f_name,
        'l_name': l_name,
        'patient_ref': patient_ref,
        'dob': new Date(dob),
        mobile,
        email,
    }
}
const constructAppointment = (f_name, l_name, dob, time, status, doctor_name, docotr_ref, staff_ref, staff_name, cost, type, patient_ref, appointment_ref) => {
    return {
        'f_name': f_name,
        'l_name': l_name,
        'dob': new Date(dob),
        'created_date': new Date(),
        'time': time,
        'status': status,
        'doctor_name': doctor_name,
        'docotr_ref': docotr_ref,
        'staff_ref': staff_ref,
        'staff_name': staff_name,
        'cost': cost,
        'type': type,
        'appointment_ref': appointment_ref,
        'patient_ref': patient_ref,
    }
}