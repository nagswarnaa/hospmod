import React from "react";
import { Link, useNavigate, } from "react-router-dom";
import { OPTIONS, ROUTES } from "../../js/constants";
import { generateRandom_ID } from "../../js/utils";
import FlatList from "flatlist-react"
import SideOptions from "./side-options";

const Dashboard = ({children}) => {

  const user_type = 'hospital_staff' //getUserType()
  const navigate = useNavigate()

  // "patient"   "hospital_staff"  "doctor"    "lab_staff"  "admin"    "insurance"

  const hospital_staff = [OPTIONS.PATIENTS, OPTIONS.APPOINTMENTS]

  const doctors_options = [

  ]

  const patient_options = [
   
  ]

  let final_options = []


  if(user_type === 'hospital_staff') final_options = hospital_staff

  return(
      <div className={`dashboard-container`}>
      <header className={`dashboard-options-container`}>
        
        <div className={``} style={{height: '6rem'}}>
          <ul className="nav__links full-h">
            <FlatList 
              list={final_options}
              key={generateRandom_ID()}
              renderItem={option => {

                  console.log(option);
                  return (
                    <div className={`dashboard-option`}>
                      <Link className={`option-link`} to={option.path && option.path}>&nbsp;{option.title}</Link>
                    </div>
                      
                  )
                }
              }            
            />
            </ul>
          </div>

          <div className={`logo`} onClick={() => navigate(ROUTES.DASHBOARD)}>Group 11 - SHS</div>
        
        </header>
      
        <div className={`dashboard-children`}>
          {children}
          <SideOptions />
        </div>
        </div>
    )
}

export default Dashboard;
