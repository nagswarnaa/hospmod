import React, { useEffect, useState } from "react"
import { ROUTES } from "../../js/constants"
import { getPatientsCollection } from "../../js/get"
import DataTable from "../components/table"

const Prescriptions = ({ }) => {

    let [patients, setPatients] = useState([])
    useEffect(() => {

        const getPatients = async () => {
            const _patients = await getPatientsCollection()
            setPatients(_patients)
        }

        getPatients()
    }, [])

    const headerData = ['First Name', 'Last Name', 'Mobile', 'DOB']
    const keys = ['f_name', 'l_name', 'mobile', 'dob']
    const but = <button>Prescription</button>

    patients = patients.map(patient => ({ ...patient, button: but }))
    console.log(patients)

    return (
        <div className={`col full-wh`}>
            <DataTable {...{ tableData: patients, headerData, keys, route: ROUTES.PATIENT }} />
        </div>
    )
}

export default Prescriptions;