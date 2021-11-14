import { db } from "../../firebase";
import { userConstants } from "./constants";

export const getRealtimeUsers = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });

     const unsubscribe = db.collection("users")
      //   .where("uid","!=",uid)
      .onSnapshot((querySnapshot) => {
        var users = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().uid !== uid) {
            users.push(doc.data());
          }
        });

        // console.log(users)

        dispatch({
          type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
          payload: users,
        });
      });

      return unsubscribe
  };
};
