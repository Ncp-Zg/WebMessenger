import { userConstants } from "../Actions/constants";

const initState = {
    users:[],
    conversations:[]
}

export const userReducer = (state=initState , action) => {
    switch (action.type) {
        case `${userConstants.GET_REALTIME_USERS}_REQUEST`:
        case `${userConstants.GET_REALTIME_USERS}_SUCCESS`:
            return state ={
                ...state,
                users: action.payload
            }
        case userConstants.GET_REALTIME_MESSAGES:
            return state ={
                ...state,
                conversations: action.payload.conversations
            }
           
    
        default:
            return state
    }
}