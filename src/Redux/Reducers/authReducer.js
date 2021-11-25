import { authConstants } from "../Actions/constants";

const initState = {
  firstName: "",
  lastName: "",
  email: "",
  authenticating: false,
  authenticated: false,
  error: null,
};

export const authReducer= (state = initState, action) => {

  switch (action.type) {
    case `${authConstants.USER_LOGIN}_REQUEST`:
      return (state = {
        ...state,
        authenticating: true,
      });
    case `${authConstants.USER_LOGIN}_SUCCESS`:
      return (state = {
        ...state,
        ...action.payload.user,
        authenticated: true,
        authenticating: false,
        error:null
      });
    case `${authConstants.USER_LOGIN}_FAILURE`:
      return (state = {
        ...state,
        authenticated: false,
        authenticating: false,
        error: action.payload.error,
      });
    case `${authConstants.USER_LOGOUT}_REQUEST`:
    case `${authConstants.USER_LOGOUT}_SUCCESS`:
      return state = {
        ...initState
      }
    case `${authConstants.USER_LOGOUT}_FAILURE`:
      return state = {
        ...state,
        error : action.payload.err
      }
    default:
      return state;
  }
};
