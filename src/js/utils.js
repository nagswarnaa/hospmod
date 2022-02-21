import { OPTIONS, SIDE_OPTIONS, USER_TYPES } from "./constants";

export const generateRandom_ID = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10) + new Date().getTime();
    

export const getOnlyDate = (date) => {
    date = new Date(date.seconds * 1000)
    const dd = date.getDate()
    const mm = date.getMonth()
    const yyyy = date.getFullYear()

    return `${mm}/${dd}/${yyyy}`
}

export const getTime = (unix_timestamp) => {
    
    var date = new Date(unix_timestamp * 1000);
 
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
}

export const getSideOptions = (user_type, route) => {
    log("user_type", user_type )
    log("route", route )
    if(user_type === USER_TYPES.HOSPITL_STAFF) return SIDE_OPTIONS.HOSPITAL_STAFF[route] || []
    return [];
}

export const inTestMode = () => (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? true : false;

export const log = (msg, value) => { inTestMode() && console.log(`[${msg}]: `, value)}
export const logError = (msg, value) => { inTestMode() && console.error(`[ERR]@[${msg}]: `, value)}
export const validateObject = (obj) => {Object.keys(obj).forEach(key => obj[key] === undefined && (obj[key] = null))}