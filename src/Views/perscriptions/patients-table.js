import React, { useEffect, useState } from "react"
import { ROUTES } from "../../js/constants"
import { getPatientsCollection } from "../../js/get"
import DataTable from "../components/table"


const PatientsTable = ({ }) => {

    const [patients, setEmployees] = useState([])
    useEffect(() => {

        const getPatients = async () => {
            const _patients = await getPatientsCollection()
            console.log("_patients", _patients);
            setEmployees(_patients)
        }

        getPatients()
    }, [])

    const headerData = ['First Name', 'Last Name', 'E-mail', 'Mobile', 'Date Of Birth']
    const keys = ['f_name', 'l_name', 'email', 'mobile', 'dob']

    return (
        <div className={`col full-wh`}>
            <DataTable {...{ tableData: patients, headerData, keys, route: '/prescriptiontable' }} />
        </div>
    )
}

export default PatientsTable;