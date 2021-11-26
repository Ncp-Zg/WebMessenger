import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../../Components/Layout/Layout";
import {
  getAllConversations,
  getRealtimeConversations,
  getRealtimeUsers,
  isViewed,
  logout,
  updateMessage,
} from "../../Redux/Actions";
import "./style.css";
import logo from "./google-messages.svg";
import { MdCheckCircle, MdCheckCircleOutline, MdEmojiEmotions, MdLogout, MdSearch, MdSend, MdZoomIn } from "react-icons/md";

const User = (props) => {
  const { user, onClick, convo } = props;

  return (
    <div
      onClick={(e) => onClick(user, convo)}
      className="displayName"
      tabIndex="1"
    >
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
          alignItems:"center",
          alignSelf:"center"
        }}
      >
        <p className="m-0">
          {user.firstName} {user.lastName}
        </p>
        <span
          className={user.isOnline ? `onlineStatus` : `onlineStatus off`}
        ></span>
        {/* <span> convo.map(conv=>conv.isView === false)</span> */}
        {/* {console.log(convo)} */}
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
  const [online, setOnline] = useState(false);
  const [message, setMessage] = useState("");

  const ref = useRef(0);
  const msgref = useRef("");
  const [userUid, setUserUid] = useState(null);
  let unsubscribe;

  // console.log(users.conversations)

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

  const initChat = async (user, convo) => {
    setChatStarted(true);
    setChatUser(`${user.firstName} ${user.lastName}`);
    setUserUid(user.uid);
    setOnline(user.isOnline);
    
    dispatch(isViewed(auth.uid,user.uid));
  };

  // console.log(users.conversations)
  useEffect(()=>{
    // console.log("render")
    dispatch(isViewed(auth.uid,userUid));
  },[users.conversations])

  const submitMessage = (e) => {
    // console.log(e);
    if (e.keyCode === 13 || e._reactName === "onClick") {
      const msgObj = {
        user_uid_1: auth.uid,
        user_uid_2: userUid,
        name: auth.firstName + auth.lastName,
        message,
      };

      if (message !== "") {
        dispatch(updateMessage(msgObj));
        setMessage("");
      }
    }

    // console.log(msgObj);
  };
  //   console.log(userUid)
  useEffect(() => {
    if (userUid !== null) {
      // console.log("render")
      dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: userUid }));
    }
  }, [userUid]);

  // useEffect(()=>{
  //   dispatch(getAllConversations(auth.uid))
  // },[users.conversations])
  // useEffect(()=>{
  //   dispatch(isViewed(auth.uid))
  // },[users.conversations])

  // console.log(userUid, users.allmsg)
  ref.current = users.allmsg.filter(
    (msg) => msg.isView === false && msg.user_uid_1 !== userUid
  ).length;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // console.log(messagesEndRef)
    scrollToBottom();
  }, [users.conversations]);

  useEffect(() => {
    if (msgref.current !== "" && ref.current !== 0)
      toast.success(<p style={{ marginLeft: "14px" }}>{msgref.current}</p>, {
        icon: () => <img style={{ width: "40px" }} src={logo} />,
      });
  }, [ref.current]);

// console.log(users.conversations)

  return (
    <Layout>
      <ToastContainer theme="dark" />
      <section className="container1">
        <div className="listOfUsers">
          <div
            style={{
              width: "100%",
              height: "40px",
              backgroundColor: "#2A2F32",
              alignItems: "center",
            }}
          >
            <div>
            {auth.authenticated ? (
                <img style={{
                  height: "25px",
                  float:"left",
                  width: "25px",
                  borderRadius: "100%",
                  marginTop:"7px",
                  marginLeft:"5px"
                }} src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"/>
              ) : null}
              
              {auth.authenticated ? (
                <div
                  style={{
                    color: "orange",
                    float: "left",
                    paddingLeft: "5px",
                    paddingTop: "7px",
                  }}
                >
                  {auth.firstName} {auth.lastName}
                </div>
              ) : null}
            </div>
            {auth.authenticated ? (
              <MdLogout
                style={{
                  paddingTop: "7px",
                  color: "red",
                  float: "right",
                  justifySelf: "flex-end",
                  marginRight: "8px",
                  marginTop:"3px",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
                onClick={() => dispatch(logout(auth.uid))}
              >
                Logout
              </MdLogout>
            ) : null}
          </div>
          <div
            style={{
              width: "100%",
              height: "30px",
              backgroundColor: "#131C23",
              display:"grid",
              gridTemplateColumns:"1fr",
              alignItems:"center",
              justifyContent:"center"
              
              
              
            }}
          >
            <MdSearch 
              style={{ color: "gray", zIndex:"0", gridRowStart:"1",gridColumnStart:"1",marginLeft:"12%"}}
            />
            <input
              className="searchinput "
              placeholder="Search..."
              style={{
                justifySelf:"center",
                borderRadius: "20px",
                height: "20px",
                width: "80%",
                backgroundColor: "#43474b",
                color:"white",
                borderStyle: "none",
                caretColor: "white",
                paddingLeft: "30px",gridRowStart:"1",gridColumnStart:"1"
              }}
            />
          </div>
          <div style={{ backgroundColor: "#131C23", color: "white" }}>
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
            <div ref={messagesEndRef} />
          </div>
          <hr />

          {users.allmsg.map((msg, index) => {
            if (!msg.isView && msg.user_uid_1 !== userUid) {
              {
                msgref.current = msg.name + "  " + " : " + " " + msg.message;
              }
            }
          })}
          {
            ref.current ? <p style={{ color: "white" }}>
            Okunmamış {ref.current} yeni mesajınız var
          </p> : null
          }
          
        </div>
        <div className="chatArea">
          <div className="chatHeader">
            <div style={{ display:"flex",justifyContent:"center",alignItems:"center",marginRight:"5px" }}>
              {chatStarted ? (
                <img
                  style={{
                    height: "25px",
                    width: "25px",
                    borderRadius: "100%"
                  }}
                  src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
                  alt=""
                />
              ) : null}
            </div>

            {online ? (
              <div style={{ width: "100%" }}>
                <div
                  style={{ width: "70%", height: "20px"}}
                >
                  {chatStarted ? chatUser : null}
                </div>
                <div
                  style={{
                    width: "70%",
                    height: "20px",
                    lineHeight: "15px",
                    fontSize: "10px",
                  }}
                >
                  online
                </div>
              </div>
            ) : (
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    width: "70%",
                    height: "40px",
                    paddingTop: "2px",
                    lineHeight: "35px",
                  }}
                >
                  {chatStarted ? chatUser : null}
                </div>
              </div>
            )}
          </div>
          <div className="messageSections ">
            {chatStarted
              ? users.conversations.map((con, index) => (
                  <div key={index}>
                    <div
                      style={{
                        textAlign:
                          con.user_uid_1 === auth.uid ? "right" : "left",
                      }}
                    >
                      {con.user_uid_1 === userUid ? (
                        <p className="messageStyle1">{con.message}</p>
                      ) : con.user_uid_2 === userUid ? (
                        <p className="messageStyle">
                          {
                            con.isView ? <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                              <p>{con.message}</p>
                              <MdCheckCircle style={{marginLeft:"5px",fontSize:"12px"}}/>

                            </div> : <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <p>{con.message}</p>
                              <MdCheckCircleOutline style={{marginLeft:"5px",fontSize:"12px"}}/>

                            </div>
                          }
                          
                          </p>
                      ) : null}
                    </div>
                    <div ref={messagesEndRef} />
                  </div>
                ))
              : null}
          </div>
          <div ref={messagesEndRef} />
          {chatStarted ? (
            <div className="chatControls">
              <MdEmojiEmotions
                style={{ marginRight: "15px", fontSize: "25px", color: "gray" }}
              />
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="write something"
                onKeyDown={(e) => submitMessage(e)}
              />
              <MdSend
                type="submit"
                style={{
                  marginLeft: "20px",
                  backgroundColor: "green",
                  borderRadius: "100%",
                  padding: "4px",
                  color: "white",
                  fontSize: "20px",
                }}
                onClick={submitMessage}
              />
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
