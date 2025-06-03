import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./Sign.css";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle redirect after successful registration
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => navigate("/login"), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset previous errors

    // Basic client-side validation
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/register", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password
      });

      if (response.status === 201) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        // Clear form fields
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed. Please try again.";
      setErrorMessage(message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
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
            autoComplete="new-password"
            minLength="6"
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            minLength="6"
          />
        </div>

        <button 
          type="submit" 
          className="btn-auth"
          disabled={!!successMessage} // Disable button after success
        >
          Create Account
        </button>

        <p className="switch">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Sign in here
          </Link>
        </p>
      </form>
    </div>
  );
}
