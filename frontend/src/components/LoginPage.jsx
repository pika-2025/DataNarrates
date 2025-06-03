import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";
import "./Sign.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, loggedIn } = useAuth();

  useEffect(() => {
    if (loggedIn) {
      navigate("/dashboard"); // Redirect if already logged in
    }
  }, [loggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post("/login", {
        email: email.toLowerCase().trim(),
        password
      });
      login();
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn-auth">
          Sign In
        </button>
        <p className="switch">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
