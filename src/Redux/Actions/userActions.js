
import { db, storage } from "../../firebase";
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

    const data = {
      ...message,
        isView: false,
        createdAt: new Date(),
    }

    db.collection("conversation")
    .add(data).then(async (res)=>{
      const document = await res.get()
      // const msg ={msgData:document.data(),msgId:document.id};
      // const uploadRef = storage.ref(`conversation/${document.id}`)

      db.collection("conversation").doc(document.id).update({
          msgId:document.id
      })
     
    })
      

    }
    
    
    
    // .add({
    //     ...message,
    //     isView: false,
    //     createdAt: new Date(),
    //   })
    //   .then((data) => {
    //     // console.log(data);
    //     //success
    //     // dispatch({
    //     //     type:userConstants.GET_REALTIME_MESSAGES,
    //     // })
    //   })
    //   .catch((err) => console.log(err));
//   };
};

export const getRealtimeConversations = (user) => {
  return async (dispatch) => {
    db.collection("conversation")
      // .where("user_uid_1", "in", [user.uid_1, user.uid_2])
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const conversations = [];
        const allmsg=[]
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

          if (doc.data().user_uid_2 === user.uid_1){
            allmsg.push(doc.data())
          }
        })
        dispatch({
          type: userConstants.GET_REALTIME_MESSAGES,
          payload: { conversations},
        });

          dispatch({
          type: userConstants.GET_ALL_MESSAGES,
          payload: { allmsg},
        });
        
      }, (err)=>console.log(err));
    //user_uid_1 === "myid" and user_uid_2 = your id or user=uid_1 = yourid and user=uid_2 = myid
  };
};

// export const getAllConversations = (id) => {
//   return async (dispatch) => {
//     db.collection("conversation")
//     .onSnapshot((res)=>{
//       const allmsg=[]

//       res.forEach((msg)=>{
//         if((msg.data().user_uid_2===id)){
//           const data = msg.data()
//         allmsg.push(data)
//         }
        
//       })
//       dispatch({
//         type:userConstants.GET_ALL_MESSAGES,
//         payload:{allmsg}
//       })

//     })
    
      // .onSnapshot((querySnapshot) => {
      //   const allmsg = [];
      //   querySnapshot.forEach((doc) => {
          
          
      //       allmsg.push(doc.data());
      //       console.log(allmsg)
            
          
      //   })
      //   dispatch({
      //     type: userConstants.GET_ALL_MESSAGES,
      //     payload: { allmsg},
      //   });
        
      // }, (err)=>console.log(err));
    //user_uid_1 === "myid" and user_uid_2 = your id or user=uid_1 = yourid and user=uid_2 = myid
//   };
// };


export const isViewed = (con) => {
  // console.log(con)
  return async (dispatch) => {
    con.forEach(conv=>{

      if(!conv.isView){
        db.collection("conversation").doc(conv.msgId)
      .update({
        isView:true
      })
      }

      
    })


}}