import React, { useEffect, useState } from "react"
import { ROUTES } from "../../js/constants"
import { getEmployeesCollection } from "../../js/get"
import DataTable from "../components/table"


const Employees = ({ }) => {

    const [employees, setEmployees] = useState([])
    useEffect(() => {

        const getEmployees = async () => {
            const _employees = await getEmployeesCollection()
            console.log("_employees", _employees);
            setEmployees(_employees)
        }

        getEmployees()
    }, [])

    const headerData = ['First Name', 'Last Name', 'Type', 'DOB', 'Title', 'Department']
    const keys = ['f_name', 'l_name', 'type', 'dob', 'title', 'department']

    return (
        <div className={`col full-wh`}>
            <DataTable {...{ tableData: employees, headerData, keys, route: ROUTES.EMPLOYEE }} />
        </div>
    )
}

export default Employees;