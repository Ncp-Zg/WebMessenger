import React, { useEffect, useState } from "react";
import Card from "../../Components/UI/Card/Card";
import Layout from "../../Components/Layout/Layout";

import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { isloggedInUser, signIn } from "../../Redux/Actions/authActions";
import { Redirect } from "react-router";
import Header from "../../Components/Header/Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const auth = useSelector(state=>state.auth)

  console.log(auth)
  // useEffect(()=>{
  //   if(!auth.authenticated){
  //     dispatch(isloggedInUser())
  //   }
  // },[])

  const userLogin = (e) =>{
    e.preventDefault();

    if(email == ""){
      alert("Email is required")
      return;
    }
    if(password == ""){
      alert("Password is required")
      return;
    }

    dispatch(signIn({email,password}));
  }

  if(auth.authenticated){
    return<Redirect to="/"/>
  }
  return (
    <Layout>
      <Header/>
      <div className="loginContainer">
        <Card>
          <form onSubmit={userLogin}>
            <input 
            name="email"
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"

            />
            <input 
            name="password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"

            />

            <div>
                <button>
                    Login
                </button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
