import FlatList from "flatlist-react";
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';
import { COLORS, ROUTES, USER_TYPES } from "../../js/constants";
import { generateRandom_ID, getSideOptions, log } from "../../js/utils";

const SideOptions = ({}) => {

    const loc = useLocation()
    console.log(loc);
    const user_type = USER_TYPES.HOSPITL_STAFF
    const options = getSideOptions(user_type, loc.pathname.replace("/", "").toUpperCase())
    log("OPTIONS", options)
    return(
        <div className={`padding-xx full-h col j-center`}>

            {options.length > 0 && (
                <div className={`side-options-container`}>

                    <div className={`side-options non-hover`} style={{
                        color: COLORS.WHITE, 
                        backgroundColor: COLORS.MAIN,
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        padding: '1.5rem',
                        margin: 0,
                        borderTopLeftRadius: '1rem',
                        borderTopRightRadius: '1rem', }}>Options</div>

                    <FlatList
                        list={options}
                        key={generateRandom_ID()}
                        renderItem={opt => {
                            return (
                                <Link className={`side-options`} to={opt.path}>{opt.title}</Link>
                            );
                        }}
                    />

                </div>
            )}
           
        </div>
    )
}

export default SideOptions;