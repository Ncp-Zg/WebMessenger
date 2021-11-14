import { userConstants } from "../Actions/constants";

const initState = {
    users:[]
}

export const userReducer = (state=initState , action) => {
    switch (action.type) {
        case `${userConstants.GET_REALTIME_USERS}_REQUEST`:
            
        case `${userConstants.GET_REALTIME_USERS}_SUCCESS`:
            return state ={
                ...state,
                users: action.payload
            }
           
    
        default:
            return state
    }
}