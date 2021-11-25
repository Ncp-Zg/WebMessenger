import React, { useEffect, useState } from "react";
import Card from "../../Components/UI/Card/Card";
import Layout from "../../Components/Layout/Layout";


import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { isloggedInUser, signIn } from "../../Redux/Actions/authActions";
import { Redirect } from "react-router";
import Header from "../../Components/Header/Header";
import { toast } from "react-toastify";

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
      <div className="form-floating mb-3 registerContainer">
        <Card>
          <form onSubmit={userLogin}>
            <h3 className="d-flex justify-content-center align-items-center">Login</h3>
            <div className="form-floating mb-2">
            <input className="form-control" id="floatingInput"
            name="email"
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"

            />
            <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
            <input className="form-control" 
            name="password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"

            />
            <label for="floatingInput">Password</label>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
                <button className="btn btn-success ">
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
