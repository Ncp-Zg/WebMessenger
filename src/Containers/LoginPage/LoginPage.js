import React, { useState } from "react";
import Card from "../../Components/UI/Card/Card";
import Layout from "../../Components/Layout/Layout";

import "./style.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Layout>
      <div className="loginContainer">
        <Card>
          <form>
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
