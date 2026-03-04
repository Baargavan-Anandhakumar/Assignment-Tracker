import React, { useState } from "react";
import "./Login.css";

function Login({ setUserId }) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    const url = isLogin
      ? "http://localhost:8080/auth/login"
      : "http://localhost:8080/auth/register";

    const body = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        if (isLogin) {
          const data = await response.json();
          localStorage.setItem("userId", data.id);
          setUserId(data.id);
        } else {
          alert("Registration Successful! Please login.");
          setIsLogin(true);
        }
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>AssignTrack</h1>
        <p className="subtitle">
          {isLogin ? "Login to continue" : "Create new account"}
        </p>

        {!isLogin && (
          <input
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleAuth}>
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="toggle-text">
          {isLogin ? "New user?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;