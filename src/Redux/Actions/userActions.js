import { db } from "../../firebase";
import { userConstants } from "./constants";

export const getRealtimeUsers = () => {
  return async (dispatch) => {
    dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });

    db.collection("users")
      // .where("","","")
      .onSnapshot((querySnapshot) => {
        var users = [];
        querySnapshot.forEach((doc) => {
           users.push(doc.data());
        });

        // console.log(users)

        dispatch({
          type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
          payload: users ,
        });
      });
  };
};
