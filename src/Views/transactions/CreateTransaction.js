import React, { useEffect, useState } from "react";
import {getPatientsCollection} from "../../js/get";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../js/constants";
import DataTable from "../components/table"
const CreateTransaction = () => {

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

    return(
        <div className={`dashboard-container`}>
              <h1>Create Transaction</h1>
        </div>
    )
};

export default CreateTransaction;
