import { generateRandom_ID, getOnlyDate } from "../../js/utils";
import FlatList from 'flatlist-react';
import React from "react"

const PatientsTable = ({ patients }) => {

    console.log(patients);
    return (
        <div className={`table-container center-hv`}>
            <div className={`row-container`} key={generateRandom_ID()}>
                <>
                    <div className={`font-lable-m table-cell`} style={{ fontWeight: 500 }}>{`PATIENT NAME`}</div>
                    <div className={`font-lable-m table-cell`} style={{ fontWeight: 500 }}>{`MOBILE`}</div>
                    <div className={`font-lable-m table-cell`} style={{ fontWeight: 500 }}>{`DOB`}</div>
                </>
            </div>
            {patients.length > 0 &&

                <FlatList
                    list={patients}
                    key={generateRandom_ID()}
                    renderItem={patient => {

                        return (
                            <div className={`row-container`} key={generateRandom_ID()}>
                                <PatientRow {...{ patient }} />
                            </div>
                        );
                    }}
                />
            }
        </div>

    )
}

const PatientRow = ({ patient }) => {

    return (
        <>
            <div className={`font-lable-m table-cell`}>{`${patient.f_name} ${patient.l_name}`}</div>
            <div className={`font-lable-m table-cell`}>{`${patient.mobile}`}</div>
            <div className={`font-lable-m table-cell`}>{`${getOnlyDate(patient.dob)}`}</div>
        </>
    )
}
export default PatientsTable;