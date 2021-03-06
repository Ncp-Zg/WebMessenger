import React, { useState } from "react";
import Card from "../../Components/UI/Card/Card";
import Layout from "../../Components/Layout/Layout";
import { signup } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import Header from "../../Components/Header/Header";
import RegisterComponent from "./RegisterComponent";

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

 

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const inputs = [
    {
      name: "firstName",
      type: "text",
      errorMessage: "It should be greater than 3",
      pattern: "^[A-Za-z0-9]{3,16}$",
      placeholder: "First Name",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      // errorMessage:"It should be ",
      placeholder: "Last Name",
      required: true,
    },
    {
      name: "email",
      type: "email",
      errorMessage: "It should be valid e-mail",
      placeholder: "E-mail",
      required: true,
    },
    {
      name: "password",
      type: "password",
      errorMessage: "Should include atleast 1 letter, 1 number,1 special char and must be greater than 8",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      placeholder: "Password",
      required: true,
    },
    {
      name: "confirmpassword",
      type: "password",
      errorMessage: "It should be same with password",
      pattern: values.password,
      placeholder: "Confirm Password",
      required: true,
    },
  ];

  const registerUser = (e) => {
    e.preventDefault();

    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };
    dispatch(signup(user));
    };

  if (auth.authenticated) {
    return <Redirect to="/" />;
  }

  const handleChange = (e) => {
    // e.preventDefault();
    
    setValues({ ...values, [e.target.name]: e.target.value });
  };
// console.log(values);
  return (
    <Layout>
      <Header />
      <div className="registerContainer">
        <Card>
          <form onSubmit={registerUser}>
            <h3 style={{display:"flex",justifyContent:"center",marginBottom:"15px"}}>Sign Up</h3>

            {inputs.map((inpt,name) => (
              <RegisterComponent key={name} value={values[inpt.name]} {...inpt} handlechange={handleChange}/>
            ))}
            <div style={{display:"flex",justifyContent:"center"}}>
              <button className="btn btn-success " type="submit">SignUp</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
