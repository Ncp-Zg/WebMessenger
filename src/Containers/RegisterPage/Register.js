import React, { useState } from "react";
import Card from "../../Components/UI/Card/Card";
import Layout from "../../Components/Layout/Layout";
import {signup} from "../../Redux/Actions"
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { Redirect } from "react-router";
import Header from "../../Components/Header/Header";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const auth = useSelector(state=>state.auth)

  const registerUser=(e)=>{

    e.preventDefault()

    const user = {
        firstName,lastName,password,email
    }
      dispatch(signup(user))
  }

  if(auth.authenticated){
    return<Redirect to="/"/>
  }

  return (
    <Layout>
      <Header/>
      <div className="registerContainer">
        <Card>
          <form onSubmit={registerUser}>
            <h3>Sign Up</h3>

            <input 
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
            placeholder="FirstName"

            />
            <input 
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
            placeholder="LastName"

            />
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit">
                    SignUp
                </button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
