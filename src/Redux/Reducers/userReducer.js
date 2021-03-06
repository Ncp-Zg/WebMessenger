import { userConstants } from "../Actions/constants";

const initState = {
    users:[],
    conversations:[],
    allmsg:[]
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
                conversations: action.payload.conversations,
            }
        case userConstants.GET_ALL_MESSAGES:
            return state ={
                ...state,
                allmsg: action.payload.allmsg
            }

        // case userConstants.NON_VIEWED_MESSAGES:

        //     let conv = state.conversations.map(con=>({...con,isView:true}))
        //     console.log(conv)
        //     return state ={
        //         ...state,
        //         conversations:conv
        //     }
           
    
        default:
            return state
    }
}