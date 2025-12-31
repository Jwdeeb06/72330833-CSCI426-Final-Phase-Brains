import React from "react";
import { useAuth } from "../components/AuthContext";
import LoginForm from "../components/LoginForm";
import "../styles/Login.css";
import poster from "../assets/Brains login.jpg";

const Login = () => {
  const { user, logout } = useAuth();

  return (
    <div className="login-container">
      <img src={poster} alt="Login Background" className="login-bg" />

      <div className="login-overlay">
        {user ? (
          <div className="logged-in-message">
            <h2>Welcome, {user.username}!</h2>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};

export default Login;
