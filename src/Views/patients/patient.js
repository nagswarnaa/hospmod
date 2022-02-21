import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"


const Patient = () => {
    const { state } = useLocation();
    console.log("P-View-Props: ", state);

    return(
        <div className={`col ful-wh center-hv`}>
            PATIENT VIEW
        </div>
    )
}

export default Patient;