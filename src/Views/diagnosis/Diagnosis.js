import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDiagnosis } from "../../js/diagnosis";
import { fake_db_generator } from "../../js/post";
import DiagnosisTable from "./diagnosis-table"

const Diagnosis = () => {
  const [diagnosis, setDiagnosis] = useState([])
    useEffect(() => {
  const getAllDiagnosis= async () =>{
      const res = await getDiagnosis()
      setDiagnosis(res);
      console.log(res)
  }
  getAllDiagnosis()

},[])


    return(
        <div className={`dashboard-container`}>

            <div className={`row full-w center-hv`} style={{ position: 'relative', zIndex: '1' }} >
            <DiagnosisTable {...{diagnosis}} />


        </div>
        <div className={`row full-w center-hv`} style={{ position: 'relative', zIndex: '100' }} id ="report"> helloooooo</div>
        </div>
    )
}


export default Diagnosis
