import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Layout from "../../Components/Layout/Layout";
import { getAllConversations, getRealtimeConversations, getRealtimeUsers, isViewed, updateMessage } from "../../Redux/Actions";
import "./style.css";

const User = (props) => {
  const { user, onClick,convo } = props;
  return (
    <div onClick={() => onClick(user,convo)} className="displayName">
      <div className="displayPic">
        <img
          src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
          alt=""
        />
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          margin: "0 10px",
        }}
      >
        <span style={{ fontWeight: 500 }}>
          {user.firstName} {user.lastName}
        </span>
        <span
          className={user.isOnline ? `onlineStatus` : `onlineStatus off`}
        ></span>
        {/* <span> convo.map(conv=>conv.isView === false)</span> */}
        {console.log(convo)}
      </div>
    </div>
  );
};

const HomePage = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  // const [convo, setConvo] = useState([]);
  const [userUid, setUserUid] = useState(null);
  let unsubscribe;


  console.log(users.allmsg)

  useEffect(() => {
    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch((err) => console.log(err));

  }, []);

  useEffect(() => {
    return () => {
      //cleanup

      unsubscribe.then((f) => f()).catch((error) => console.log(error));
    };
  }, []);



  const initChat = async (user,convo) => {

    setChatStarted(true);
    setChatUser(`${user.firstName} ${user.lastName}`);
    setUserUid(user.uid);


    dispatch(isViewed(convo)) 
    
    

  };

  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    };

    if (message !== "") {
      dispatch(updateMessage(msgObj))
      setMessage("")
    }

    // console.log(msgObj);
  };
//   console.log(userUid)
  useEffect(()=>{
      if(userUid){
        //   console.log(userUid)
        dispatch(getRealtimeConversations({uid_1:auth.uid,uid_2:userUid }))
        dispatch(getAllConversations(auth.uid))
      }

  },[userUid,message===""])

  return (
    <Layout>
      <section className="container">
        <div className="listOfUsers">
          {users.users?.length > 0
            ? users.users.map((user) => {
                return (
                  <User
                    key={user.uid}
                    user={user}
                    convo={users.conversations}
                    onClick={initChat}
                  />
                );
              })
            : null}
        </div>
        <div className="chatArea">
          <div className="chatHeader">{chatStarted ? chatUser : null}</div>
          <div className="messageSections">
            {chatStarted ? 
            users.conversations.map((con,index)=>
                (
              <div key={index} style={{ textAlign: con.user_uid_1 === auth.uid ? "right" : "left" }}>
                
                {
                    
                    (con.user_uid_1 === userUid || con.user_uid_2 === userUid) ?<p className="messageStyle">
                        {con.message}
                    </p> : null
                    }
                
              </div>
            )
                )
             : null}
          </div>

          {chatStarted ? (
            <div className="chatControls">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="write something"
              />
              <button onClick={submitMessage}>Send</button>
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
