
import React from "react"

const ActionButton = ({title, action, continerStyle, className, name}) => {
    return(
        <div 
            name={name || 'submit'}
            onClick={action}
            className={`button-continer ${className}`} 
            style={{...continerStyle}}>
            {title}
        </div>
    )
}


export default ActionButton;