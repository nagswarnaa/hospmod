import React, { useEffect, useState } from "react";
import {getPatientsCollection} from "../../js/get";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../js/constants";
import DataTable from "../components/table"
const CreateTransaction_PatientsTable = () => {

  const [newtransaction, setNewTransaction] = useState([])
//     useEffect(() => {
//   const getTransaction= async () =>{
//       const res = await getAllTransactions()
//      setTransaction(res)
//   }
//   getTransaction()
// },[])
useEffect(() => {
const getPatientRef= async () =>{
  const res = await getPatientsCollection()
 setNewTransaction(res)
}
getPatientRef()
},[])
const headerData = [ 'First Name', 'Last Name', 'Patient ID']
const keys = ['f_name', 'l_name', 'patient_ref']
let navigate = useNavigate();
  const routeChange = () =>{
    let path = '/transactions';
    navigate(path)
  }
    return(
        <div className={`dashboard-container`}>
              <div className={`row full-w left-hv`}>
                <input type='text' name='search' placeholder='Enter a value' id='searchbar'></input>
              </div>
                <div align = "right">
                <button onClick = {routeChange}> Back </button>
                </div>
              <div className={`row full-w left-hv`}>
                  <DataTable {...{tableData: newtransaction, headerData, keys, route: ROUTES.CREATE_TRANSACTION}} />
            </div>
        </div>
    )
};

export default CreateTransaction_PatientsTable;
