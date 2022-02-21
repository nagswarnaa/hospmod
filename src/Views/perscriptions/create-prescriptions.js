import React, { useEffect, useState } from "react"
import { getLastAppointment } from "../../js/get"
import { generateRandom_ID, logError } from "../../js/utils"
import ActionButton from "../components/action-button"
import TextArea from "../components/textarea"
import TextBox from "../components/textfield"
import { createNewPrescription } from "../../js/post"

const CreatePrescription = ({}) => {

    const [lastAppointment, setLastAppointment] = useState({})
    const [prescription, setPrescription] = useState(
        {
            description: '',
            medications: {}
        })
    const patient = {
        patient_ref: 'febDs3M3OxMhtxKuUP5E'
    }

    const handlePrescriptionChange = e => setPrescription({...prescription, [e.target.name]: e.target.value})
    const handleMedicationChange = e => {
        const med_key = e.target.name.split("_")[0]
        setPrescription({
            ...prescription,
            medications: {
                ...prescription.medications,
                [med_key]: {...prescription.medications[med_key], [e.target.name]: e.target.value}
            }
        })
    }

    useEffect(() => {

        const getPatientLastAppointment = async () => {
            const _appointment = await getLastAppointment(patient)
            setLastAppointment(_appointment)
        }
        getPatientLastAppointment()
    }, [])

    return(
        <div className={`window-continer`}>

            <div className={`row j-start a-center`} style={{width: '70%'}}>
                <TextBox
                    name={'name'}
                    className={`blocked`}
                    val={lastAppointment.f_name + ' ' + lastAppointment.l_name}
                    handleChange={() => {}}
                    style={{marginLeft: '0.5rem'}}
                    lable={'Name'}
                />
                <TextBox
                    name={'date'}
                    className={`blocked`}
                    continerStyle={{width: '35rem', marginLeft: '2rem'}}
                    val={new Date(lastAppointment.created_date && lastAppointment.created_date.seconds * 1000)}
                    handleChange={() => {}}
                    style={{marginLeft: '0.5rem', marginLeft: '2rem'}}
                    lable={'Date'}
                />
            </div>

            <div className={`row j-start a-center margin-t-xxx`} style={{width: '70%'}}>
                <TextArea
                    name={'description'}
                    val={prescription.description}
                    handleChange={handlePrescriptionChange}
                    style={{marginLeft: '1rem', width: '95%'}}
                    lable={'Description'}
                />
            </div>

                {Object.keys(prescription.medications).map((med, i) => {
                    const name_key = `${med}_name`
                    const directions_key = `${med}_directions`
                    const uses_key = `${med}_uses`
                    return (
                        <div className={`row j-start a-center margin-t-xxx`} style={{width: '90%'}} >
                            <TextBox
                                name={name_key}
                                val={prescription.medications[med][name_key]}
                                handleChange={handleMedicationChange}
                                style={{marginLeft: '0.5rem', }}
                                lable={'Medication ' }
                            />

                            <TextBox
                                name={directions_key}
                                val={prescription.medications[med][directions_key]}
                                handleChange={handleMedicationChange}
                                style={{marginLeft: '0.5rem', }}
                                lable={'Directions ' }
                                continerStyle={{width: '35rem', marginLeft: '2rem'}}
                            />

                            <TextBox
                                name={uses_key}
                                val={prescription.medications[med][uses_key]}
                                handleChange={handleMedicationChange}
                                style={{marginLeft: '0.5rem', }}
                                lable={'Uses ' }
                                continerStyle={{width: '20rem', marginLeft: '2rem'}}
                            />

                            <ActionButton
                                title={'Remove'}
                                action={() => removeMedication(prescription, setPrescription, med)}
                                continerStyle={{marginLeft: '3rem', marginTop: '1.5rem', backgroundColor: 'var(--red)',}}
                                className={''}
                                name={'Remove'}
                            />
                       </div>
                    );
                })}

            <div className={`row j-start a-center margin-t-xxx`} style={{width: '70%'}}>
                <ActionButton
                    title={'Add Medications'}
                    action={() => addMedication(prescription, setPrescription)}
                    continerStyle={{backgroundColor: 'var(--secondary)', width: '15rem'}}
                    className={''}
                    name={'submit'}
                />
            </div>

            <div className={`row j-start a-center margin-t-xxx`} style={{width: '70%'}}>
                <ActionButton
                    title={'Submit'}
                    action={() => submit(prescription, lastAppointment)}
                    continerStyle={{}}
                    className={''}
                    name={'submit'}
                />
            </div>

        </div>
    )
}

const submit = async (prescription, lastAppointment) => {

    try{
        const res = await createNewPrescription({prescription, lastAppointment})
        if(res) alert("Prescription created successfully!")
        else alert("Creating prescription failed!")
    }
    catch(e){
        logError("CreatPrescription", e)
    }
}

const removeMedication = (prescription, setPrescription, key) => {

    const medications = prescription.medications
    delete medications[key]
    setPrescription(
        {
            ...prescription,
            medications: medications
        })
}

const addMedication = (prescription, setPrescription) => {

    const key = generateRandom_ID()
    setPrescription(
        {
            ...prescription,
            medications: {
                ...prescription.medications,
                [key]: {
                    [`${key}_name`]: '',
                    [`${key}_directions`]: '',
                    [`${key}_uses`]: ''
                }
            }
        })
}

export default CreatePrescription;
