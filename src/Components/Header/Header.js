import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../Redux/Actions";
import "./style.css";

const Header = (props) => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // const logout = () => {
  //   dispatch(logout())
  // }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid" >
        <div class="navbar-brand text-warning">Chat App</div>
        {/* <h1>{users.conversations.find(cv=>cv.isView===false) ? `${users.chatUser}'den msg` : null}</h1> */}
        {!auth.authenticated ? (
          <ul className="navbar-nav">
            <li className="navbar-item">
              <NavLink className="nav-link active text-success" to={"/login"}>Login</NavLink>
            </li>
            <li>
              <NavLink className="nav-link active text-success" to={"/signup"}>Sign up</NavLink>
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
    </nav>
  );
};

export default Header;
