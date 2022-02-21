
import { TextField } from '@material-ui/core';
import React from "react"

const TextArea = ({val, handleChange, style, lable, name, continerStyle, className}) => {
    return(
        <div className={`textarea-continer`} style={{...continerStyle}}>
            <span style={{width:'100%', marginBottom: '0.3rem'}}>{lable}</span>
            <div className={`textfield ${className}`}>
                <TextField
                    name={name}
                    multiline
                    rows={7}
                    style={{...style}}
                    value={val}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}


export default TextArea;