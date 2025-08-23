import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

// Import original SVG icons
import settingsIcon from "../assets/icons/settings.svg";
import profileIcon from "../assets/icons/profile.svg";
import newPostIcon from "../assets/icons/newpost.svg";

const Header: React.FC = () => {
  const { user, logout, userVersion } = useAuth();

  // Отладочная информация
  console.log("Header render - user:", user?.username, "version:", userVersion);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-top">
          <Link to="/" className="logo">
            Realworld Blog
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">
              Home
            </Link>

            {user ? (
              <>
                <Link to="/new-post" className="nav-link">
                  <img src={newPostIcon} alt="New Post" className="nav-icon" />
                  New Post
                </Link>
                <Link to="/settings" className="nav-link">
                  <img src={settingsIcon} alt="Settings" className="nav-icon" />
                  Settings
                </Link>
                <div className="user-info">
                  <div className="user-profile-display">
                    <img src={profileIcon} alt="Profile" className="nav-icon" />
                    <span className="username">{user.username}</span>
                  </div>
                  <button onClick={handleLogout} className="logout-button">
                    <span className="nav-icon">⇥</span>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="auth-links">
                <Link to="/sign-in" className="nav-link">
                  Sign In
                </Link>
                <Link to="/sign-up" className="nav-link">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
        <div className="banner">
          <h1 className="banner-title">Realworld Blog</h1>
          <p className="banner-subtitle">A place to share your knowledge.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
