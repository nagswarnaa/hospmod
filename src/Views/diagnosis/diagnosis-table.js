import { generateRandom_ID, getOnlyDate, getTime } from "../../js/utils";
import FlatList from 'flatlist-react';
import React from "react"
import ReactDOM from 'react-dom'
import { Button, Card, CardActions, CardContent } from '@material-ui/core';



const DiagnosisTable = ({diagnosis}) => {

    return(
        <div className={`table-container center-hv`}>
            <div className={`row-container`} key={generateRandom_ID()}>
                <>
                    <div className={`font-lable-m table-cell`} style={{fontWeight: 500}}>{`PATIENT REF`}</div>
                    <div className={`font-lable-m table-cell`} style={{fontWeight: 500}}>{`APPOINTMENT REF`}</div>
                    <div className={`font-lable-m table-cell`} style={{fontWeight: 500}}>{`DOCTOR REF`}</div>
                    <div className={`font-lable-m table-cell`} style={{fontWeight: 500}}>{`DOCTOR NAME`}</div>
                    <div className={`font-lable-m table-cell`} style={{fontWeight: 500}}></div>


                </>
            </div>
            <div className={`row-container`} key={generateRandom_ID()}>
                <DiagnosisRows {...{diagnosis}} />
            </div>
        </div>

    )
}

const DiagnosisRows = ({diagnosis}) => {

    return (
       diagnosis.map((d) =>
        <>

            <div className={`font-lable-m table-cell`}>{`${d.patient_ref}`}</div>
            <div className={`font-lable-m table-cell`}>{`${d.appointment_ref}`}</div>
            <div className={`font-lable-m table-cell`}>{`${d.doctor_ref}`}</div>
            <div className={`font-lable-m table-cell`}>{`${d.doctor_name}`}</div>
            <div className={`font-lable-m table-cell`}><Button variant="contained" color="primary" onClick={() => DiagnosisReport(d.recommendations)}>View Diagnosis</Button></div>
        </>
      )
    );
}

const DiagnosisReport = (rep) => {
  console.log("hello")
  ReactDOM.render(
  <Card variant="outlined">
    <CardContent>
      <h1>Diagnosis Report</h1>
      <p>{rep}</p>
    </CardContent>
  </Card>,
  document.getElementById('report')
);
}
export default DiagnosisTable;
