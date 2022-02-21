import React, { useEffect, useState } from "react"
import { ROUTES } from "../../js/constants"
import { getPatientsCollection } from "../../js/get"
import DataTable from "../components/table"

const Patients = ({}) => {

    const [patients, setPatients] = useState([])
    useEffect(() => {

        const getPatients = async () => {
            const _patients = await getPatientsCollection()
            setPatients(_patients)
        }

        getPatients()
    }, [])

    const headerData = [ 'First Name', 'Last Name', 'Mobile', 'DOB',]
    const keys = ['f_name', 'l_name', 'mobile', 'dob']

    return(
        <div className={`col full-wh`}>
            <DataTable {...{tableData: patients, headerData, keys, route: ROUTES.PATIENT}} />
        </div>
    )
}

export default Patients;