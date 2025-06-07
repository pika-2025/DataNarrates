import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";
import FileUpload from "./FileUpload";
import "./DashboardPage.css";
import AIAgent from './AIAgent';

export default function DashboardPage() {
  const { loggedIn, loading, logout, userData } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Authentication check
  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, loading, navigate]);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle file upload
  const handleFileUpload = (file) => {
    console.log("Uploading file:", file.name);
    // Add your file upload logic here
  };

  // Proper logout handler
  const handleLogout = async () => {
    try {
      await logout(); 
      window.location.href = "/login"; // Force full reload
    } catch (error) {
      alert("Logout failed");
    }
  };


  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      {/* Navigation Header */}
      <header className="dashboard-header">
        <Link to="/" className="app-title">
          DataNarrates
        </Link>
        
        <div className="profile-section" ref={profileRef}>
          <button 
            className="profile-button"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <span className="user-avatar">
              {userData?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </button>

          {profileOpen && (
            <div className="profile-dropdown">
              <div className="user-info">
                <div className="user-name">{userData?.name || 'User'}</div>
                <div className="user-email">{userData?.email || ''}</div>
              </div>
              <button 
                className="dropdown-item" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">
        <h1 className="dashboard-title">Data Analysis Dashboard</h1>
        
        {/* File Upload Section */}
        <section className="upload-section">
          <FileUpload onFileUpload={handleFileUpload} />
        </section>

        {/* Analysis Section */}
        <section className="analysis-section">
          <div className="placeholder-box">
            <h3>Data Preview & Analysis</h3>
            <p>Upload a CSV file to begin analysis</p>
          </div>
        </section>
      </main>

      {/* AI Assistant Floating Button */}
      <AIAgent />
    </div>
  );
}
