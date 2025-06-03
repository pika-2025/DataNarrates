// src/components/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="logo">DataNarrates</div>
        <div className="nav-buttons">
          <Link to="/login">
            <button className="btn btn-signin">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-signup">Sign Up</button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Your Data, Your Story</h1>
          <p>
            Upload, clean, visualize, and get AI-powered explanations for your
            datasets—all in one intuitive platform.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>CSV Upload</h3>
            <p>Drag-and-drop or click to upload your CSV datasets.</p>
          </div>
          <div className="feature-card">
            <h3>Data Cleaning</h3>
            <p>Automatic handling of missing values and outliers.</p>
          </div>
          <div className="feature-card">
            <h3>Visualizations</h3>
            <p>Create interactive charts and graphs effortlessly.</p>
          </div>
          <div className="feature-card">
            <h3>AI Explanations</h3>
            <p>Receive detailed narratives in natural language.</p>
          </div>
          <div className="feature-card">
            <h3>PDF Reports</h3>
            <p>Export your analysis as a professional PDF report.</p>
          </div>
          <div className="feature-card">
            <h3>Modern UI</h3>
            <p>Enjoy a clean, responsive interface optimized for you.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
