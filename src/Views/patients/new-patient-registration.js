import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { COLORS, ROUTES } from "../../js/constants"
import { registarNewPatient } from "../../js/post"
import { log } from "../../js/utils"
import ActionButton from "../components/action-button"
import TextBox from "../components/textfield"
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { TextField } from "@material-ui/core"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const NewPatientRegistration = ({}) => {
    
    const user_ref = 'oQqvBZs9RTuzqXbLDKwd'
    const pateint_ref = 'DV1FOycVM8ebfNnQ3zrY'

    const navigate = useNavigate()
    const [isValid, setIsValid] = useState(false)
    const [patient, setPatient] = useState({
        user_ref,
        pateint_ref,
        dob: new Date(),
        f_name: '', 
        l_name: '', 
        mobile: '', 
        ssn: '', 
        address: '', 
        city: '', 
        state: '', 
        zip_code: '', 
        gender: '',    
        blood_type: '', 
        past_surgeries: '', 
        past_diseases: '', 
        past_alergies: '',
        height: '', 
        weight: '', 
        emergency_name: '', 
        emergency_phone: '', 
        emergency_relationship: '', 
        insurance_name: '', 
        insurance_policy: '', 
        insurance_group: '', 
        insurance_phone: ''
    })

    useEffect(() => {
        if(
            patient.f_name.length > 2 &&
            patient.l_name.length > 2 &&
            patient.mobile.length > 9 && !isNaN(Number(patient.mobile.length)) &&
            // patient.ssn.length > 6 && !isNaN(Number(patient.ssn.length)) &&
            patient.address.length > 10 &&
            patient.city.length > 3 &&
            patient.state.length > 1 &&
            patient.zip_code.length > 4 && !isNaN(Number(patient.zip_code.length)) &&
            patient.gender.length > 3 &&
            patient.blood_type.length > 1 &&
            patient.height.length > 1 && !isNaN(Number(patient.height.length)) &&
            patient.weight.length > 1 && !isNaN(Number(patient.weight.length)) &&
            patient.emergency_name.length > 2 &&
            patient.emergency_phone.length > 9 && !isNaN(Number(patient.emergency_phone.length)) &&
            patient.emergency_relationship.length > 3 &&
            patient.insurance_name.length > 2 &&
            patient.insurance_policy.length > 3 &&
            patient.insurance_group.length > 3 &&
            patient.insurance_phone.length > 8 && !isNaN(Number(patient.insurance_phone.length))

        ) setIsValid(true)
        else setIsValid(false)
    }, [patient])
    const handlePatientChange = e => setPatient({...patient, [e.target.name]: e.target.value})

    return(
        <div className={`new-patient-container`}>
            <div className={`new-patient`}>
                <div className="font-lable-m t-center row j-center full-w" style={{marginTop: '48rem'}}>Thankks for verifying your email. Now please fill the following information to complete your registration.</div>
                <div className={`row j-between full-w a-center margin-t-xx`} style={{width: '85%'}}>
                    <TextBox name={'f_name'} className={``} val={patient.f_name} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'First Name'} required={true} />
                    <TextBox name={'l_name'} className={``} val={patient.l_name} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Last Name'} required={true} />
                    <TextBox name={'mobile'} className={``} val={patient.mobile} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Mobile'} required={true} />
                </div>
                <div className={`row j-between full-w a-center margin-t-xx`} style={{width: '85%'}}>
                    <TextBox name={'ssn'} className={``} val={patient.ssn} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Social Security (SSN)'} />
                    <TextBox name={'gender'} className={``} val={patient.gender} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Gender'} required={true} />
                   
                    <div className="textfield-continer">
                        <span style={{width:'100%', marginBottom: '0.3rem'}}>{'Date of Birth'}&nbsp;{<b>(<b style={{color: COLORS.RED, verticalAlign: 'middle'}}>*</b>)</b>}</span>
                        <div className={`date-field `} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                
                                    // label="Date desktop"
                                    inputFormat="MM/dd/yyyy"
                                    value={patient.dob}
                                    onChange={(e) => new Date(e).getTime() > new Date().getTime()? alert("Can't have DOB that is greater than today's date!") : setPatient({...patient, dob:e})}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    
                </div>
                <div className={`row j-between full-w a-center margin-t-xx`} style={{width: '85%'}}>
                    <TextBox name={'address'} className={`full-w`} val={patient.address} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Address'} continerStyle={{width: '80%'}} required={true} />
                </div>
                <div className={`row j-between full-w a-center margin-t-xx`} style={{width: '85%'}}>
                    <TextBox name={'city'} className={``} val={patient.city} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'City'} required={true} />
                    <TextBox name={'state'} className={``} val={patient.state} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'State'} required={true} />
                    <TextBox name={'zip_code'} className={``} val={patient.zip_code} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Zip Code'} required={true} />
                </div>
                <div className={`row j-between full-w a-center margin-t-xx`} style={{width: '85%'}}>
                    <TextBox name={'height'} className={``} val={patient.height} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Height'} required={true} />
                    <TextBox name={'weight'} className={``} val={patient.weight} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Weight'} required={true} />
                    <TextBox name={'blood_type'} className={``} val={patient.blood_type} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Blood Type'} required={true} />
                </div>
                <div className={`row j-between full-w a-center margin-t-xx`} style={{width: '85%'}}>
                    <TextBox name={'emergency_name'} className={``} val={patient.emergency_name} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Emergency Contact Name'} required={true} />
                    <TextBox name={'emergency_phone'} className={``} val={patient.emergency_phone} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Emergency Contact Phone'} required={true} />
                    <TextBox name={'emergency_relationship'} className={``} val={patient.emergency_relationship} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Contact Relationship'} required={true} />
                </div>
                <div className={`row j-between full-w a-center margin-t-xx`} style={{width: '85%'}}>
                    <TextBox name={'insurance_name'} className={``} val={patient.insurance_name} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Insurance Name'} continerStyle={{width: '60%'}} required={true} />
                    <TextBox name={'insurance_policy'} className={``} val={patient.insurance_policy} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Insurance Policy Number'} required={true} />
                </div>
                <div className={`row j-between full-w a-center margin-t-xx`} style={{width: '85%'}}>
                    <TextBox name={'insurance_group'} className={``} val={patient.insurance_group} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Insurance Group Number'} required={true} />
                    <TextBox name={'insurance_phone'} className={``} val={patient.insurance_phone} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Insurance Phone'} required={true} />
                </div>
                <div className={`row j-between full-w a-center margin-t-xx`} style={{width: '85%'}}>
                    <TextBox name={'past_surgeries'} className={`full-w`} val={patient.past_surgeries} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Past Surgeries (seperate each with a comma ",")'} continerStyle={{width: '80%'}} />
                </div>
                <div className={`row j-between full-w a-center margin-t-xx`} style={{width: '85%'}}>
                    <TextBox name={'past_diseases'} className={`full-w`} val={patient.past_diseases} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Past Diseases (seperate each with a comma ",")'} continerStyle={{width: '80%'}} />
                </div>
                <div className={`row j-between full-w a-center margin-t-xx margin-b-xxx`} style={{width: '85%'}}>
                    <TextBox name={'past_alergies'} className={`full-w`} val={patient.past_alergies} handleChange={handlePatientChange} style={{marginLeft: '0.5rem'}} lable={'Past Alergies (seperate each with a comma ",")'} continerStyle={{width: '80%'}} />
                </div>
            </div>

            <div className={`row full-w j-end margin-t-xx`}>
                <ActionButton title={'Finish Registration'} action={() => submit(patient, navigate, isValid)} continerStyle={{width: '15rem', backgroundColor: !isValid ? COLORS.DARK : COLORS.MAIN}} className={``}/>
            </div>
        </div>
    )
}

const submit = async (patient, navigate, isValid) => {
    log("HEUUU")
    if(!isValid) return

    const res = await registarNewPatient(patient)
    if(!res) alert("Registration Failed!")
    else {
        alert("Registration Completed Successfully!")
        setTimeout(() => navigate(ROUTES.DASHBOARD), 3000)
    }
}
export default NewPatientRegistration;