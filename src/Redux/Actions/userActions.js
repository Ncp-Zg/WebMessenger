import { db } from "../../firebase";
import { userConstants } from "./constants";

export const getRealtimeUsers = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });

    const unsubscribe = db
      .collection("users")
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

    return unsubscribe;
  };
};

export const updateMessage = (message) => {
  return async (dispatch) => {
    db.collection("conversation")
      .add({
        ...message,
        isView: false,
        createdAt: new Date(),
      })
      .then((data) => {
        // console.log(data);
        //success
        // dispatch({
        //     type:userConstants.GET_REALTIME_MESSAGES,
        // })
      })
      .catch((err) => console.log(err));
  };
};

export const getRealtimeConversations = (user,chatUser) => {
  return async (dispatch) => {
    db.collection("conversation")
      .where("user_uid_1", "in", [user.uid_1, user.uid_2])
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const conversations = [];
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user_uid_1 === user.uid_1 &&
              doc.data().user_uid_2 === user.uid_2) ||
            (doc.data().user_uid_1 === user.uid_2 &&
              doc.data().user_uid_2 === user.uid_1)
          ) {
            conversations.push(doc.data());
            // console.log(doc.data().user_uid_1, doc.data().user_uid_2);
            
          }
        })
        dispatch({
          type: userConstants.GET_REALTIME_MESSAGES,
          payload: { conversations,chatUser },
        });
        
      }, (err)=>console.log(err));
    //user_uid_1 === "myid" and user_uid_2 = your id or user=uid_1 = yourid and user=uid_2 = myid
  };
};


export const isViewed = (con) => {
  return async (dispatch) => {
    console.log(con)
   
          dispatch({
            type:userConstants.NON_VIEWED_MESSAGES,

          })
        }


}