import React, { useEffect, useState } from "react"
import { createNewEmployee } from "../../js/post"
import ActionButton from "../components/action-button"
import TextBox from "../components/textfield"

const CreateEmployees = ({}) => {

    const [employee, setEmployee] = useState({
        f_name: null,
        l_name: null,
        type: null,
        department: null,
    })

    const handleEmployeeChange = e => {

        console.log("Event: ", e.target);
        setEmployee({...employee, [e.target.name]: e.target.value})
    }
  

    return(
        <div className={`window-continer`}>

            <div className={`row j-start a-center`} style={{width: '70%'}}>
                <TextBox
                    name={'f_name'}
                    className={``}
                    val={employee.f_name}
                    handleChange={handleEmployeeChange}
                    style={{marginLeft: '0.5rem'}}
                    lable={'First Name'}
                />

                <TextBox
                    name={'l_name'}
                    className={`margin-l-xx`}
                    val={ employee.l_name}
                    handleChange={handleEmployeeChange}
                    style={{marginLeft: '0.5rem'}}
                    lable={'Last Name'}
                />
                
            </div>

            <div className={`row j-start a-center margin-t-xx`} style={{width: '70%'}}>
                <TextBox
                    name={'type'}
                    className={``}
                    val={employee.type}
                    handleChange={handleEmployeeChange}
                    style={{marginLeft: '0.5rem'}}
                    lable={'Type'}
                />

                <TextBox
                    name={'department'}
                    className={`margin-l-xx`}
                    val={employee.department}
                    handleChange={handleEmployeeChange}
                    style={{marginLeft: '0.5rem'}}
                    lable={'Department'}
                />
                
            </div>


               
            <div className={`row j-start a-center margin-t-xxx`} style={{width: '70%'}}>
                <ActionButton
                    title={'Submit'}
                    action={() => submit(employee)}
                    continerStyle={{}}
                    className={''}
                    name={'submit'}
                />
            </div>

        </div>
    )
}

const submit = async (employee) => {

    console.log("employee: ", employee);
    createNewEmployee(employee)
}

export default CreateEmployees;
