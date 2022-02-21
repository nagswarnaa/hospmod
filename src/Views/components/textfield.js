
import { TextField } from '@material-ui/core';
import React from "react"
import { COLORS } from '../../js/constants';

const TextBox = ({val, handleChange, style, lable, continerStyle, className, name, required}) => {
    return(
        <div className={`textfield-continer `} style={{...continerStyle}}>
            <span style={{width:'100%', marginBottom: '0.3rem'}}>{lable}&nbsp;{required && <b>(<b style={{color: COLORS.RED, verticalAlign: 'middle'}}>*</b>)</b>}</span>
            <div className={`textfield ${className}`}>
                <TextField 
                    name={name}
                    style={{...style, width: '90%'}}
                    value={val}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}


export default TextBox;