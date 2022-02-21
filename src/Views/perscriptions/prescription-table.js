import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"

import { getLastAppointment } from "../../js/get"
import { generateRandom_ID, logError } from "../../js/utils"
import ActionButton from "../components/action-button"
import TextArea from "../components/textarea"
import TextBox from "../components/textfield"
import { createNewPrescription } from "../../js/post"

const PrescriptionTable = (props) => {


    let location = useLocation();
    console.log("location", location);
    // console.log(props)
    const [lastAppointment, setLastAppointment] = useState({})
    const [prescription, setPrescription] = useState(
        {
            description: '',
            medications: {}
        })
    const patient = {
        patient_ref: 'febDs3M3OxMhtxKuUP5E'
    }



    useEffect(() => {

        const getPatientLastAppointment = async () => {
            const _appointment = await getLastAppointment(patient)
            setLastAppointment(_appointment)
        }
        getPatientLastAppointment()
    }, [])

    return (
        <div className={`window-continer`}>

            <div className={`row j-start a-center`} style={{ width: '70%' }}>
                <TextBox
                    name={'name'}
                    className={`blocked`}
                    val={lastAppointment.f_name + ' ' + lastAppointment.l_name}
                    handleChange={() => { }}
                    style={{ marginLeft: '0.5rem' }}
                    lable={'Name'}
                />
                <TextBox
                    name={'date'}
                    className={`blocked`}
                    continerStyle={{ width: '35rem', marginLeft: '2rem' }}
                    val={new Date(lastAppointment.created_date && lastAppointment.created_date.seconds * 1000)}
                    handleChange={() => { }}
                    style={{ marginLeft: '0.5rem', marginLeft: '2rem' }}
                    lable={'Date'}
                />
            </div>

            <div className={`row j-start a-center margin-t-xxx`} style={{ width: '70%' }}>
                <TextArea
                    name={'description'}
                    val={prescription.description}
                    className={`blocked`}
                    style={{ marginLeft: '1rem', width: '95%' }}
                    lable={'Description'}
                />
            </div>
            <div className={`row j-start a-center margin-t-xxx`} style={{ width: '90%' }} >
                <TextBox
                    name={'medication'}
                    val={'medication'}
                    className={`blocked`}
                    style={{ marginLeft: '0.5rem', }}
                    lable={'Medication'}
                />

                <TextBox
                    name={'directions'}
                    val={'directions text box'}
                    className={`blocked`}
                    style={{ marginLeft: '0.5rem', }}
                    lable={'Directions '}
                    continerStyle={{ width: '35rem', marginLeft: '2rem' }}
                />

                <TextBox
                    name={'uses'}
                    val={'uses text box'}
                    className={`blocked`}
                    style={{ marginLeft: '0.5rem', }}
                    lable={'Uses '}
                    continerStyle={{ width: '20rem', marginLeft: '2rem' }}
                />


            </div>

            {Object.keys(prescription.medications).map((med, i) => {
                const name_key = `${med}_name`
                const directions_key = `${med}_directions`
                const uses_key = `${med}_uses`
                return (
                    <div className={`row j-start a-center margin-t-xxx`} style={{ width: '90%' }} >
                        <TextBox
                            name={name_key}
                            val={prescription.medications[med][name_key]}

                            style={{ marginLeft: '0.5rem', }}
                            lable={'Medication '}
                        />

                        <TextBox
                            name={directions_key}
                            val={prescription.medications[med][directions_key]}

                            style={{ marginLeft: '0.5rem', }}
                            lable={'Directions '}
                            continerStyle={{ width: '35rem', marginLeft: '2rem' }}
                        />

                        <TextBox
                            name={uses_key}
                            val={prescription.medications[med][uses_key]}

                            style={{ marginLeft: '0.5rem', }}
                            lable={'Uses '}
                            continerStyle={{ width: '20rem', marginLeft: '2rem' }}
                        />


                    </div>
                );
            })}





        </div>
    )
}





export default PrescriptionTable;
