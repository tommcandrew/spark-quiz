export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

export const LOADING = "LOADING";
export const LOADED = "LOADED";

export const loading = (msg) => {
    return {
        type: LOADING,
        msg: msg
    }
}

export const loaded = () => {
    return {
        type: LOADED
    }
}

export const returnErrors = (msg, status, id = null) =>{
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    }
}

export const clearErrors = () => {
    return {
       type: CLEAR_ERRORS 
    }
}
