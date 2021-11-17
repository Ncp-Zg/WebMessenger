import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../Redux/Actions";
import "./style.css";

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // const logout = () => {
  //   dispatch(logout())
  // }

  return (
    <header className="header">
      <div style={{ display: "flex" }}>
        <div className="logo">Web Messenger</div>
        <h1>{users.conversations.find(cv=>cv.isView===false) ? `${users.chatUser}'den msg` : null}</h1>
        {!auth.authenticated ? (
          <ul className="leftMenu">
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
            <li>
              <NavLink to={"/signup"}>Sign up</NavLink>
            </li>
          </ul>
        ) : null}
      </div>
      <div style={{ margin: "20px 0", color: "#fff", fontWeight: "bold" }}>
        {auth.authenticated ? `Hi ${auth.firstName} ${auth.lastName}` : ""}
      </div>
      <ul className="menu">
        {auth.authenticated ? (
          <Link to={"#"} onClick={()=>dispatch(logout(auth.uid))}>
            Logout
          </Link>
        ) : null}
        <li></li>
      </ul>
    </header>
  );
};

export default Header;
