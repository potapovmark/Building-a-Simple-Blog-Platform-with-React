import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

const Header: React.FC = () => {
  const { user, logout } = useAuth();

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
              <span className="nav-icon">🏠</span>
              Home
            </Link>

            {user ? (
              <>
                <Link to="/new-post" className="nav-link">
                  <span className="nav-icon">✏️</span>
                  New Post
                </Link>
                <div className="user-info">
                  <Link to="/profile" className="user-profile-link">
                    <img
                      src={
                        user.image ||
                        process.env.PUBLIC_URL + "/default-avatar.svg"
                      }
                      alt={user.username}
                      className="user-avatar"
                    />
                    <span className="username">{user.username}</span>
                  </Link>
                  <button onClick={handleLogout} className="logout-button">
                    <span className="nav-icon">🚪</span>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="auth-links">
                <Link to="/sign-in" className="nav-link">
                  <span className="nav-icon">🔑</span>
                  Sign In
                </Link>
                <Link to="/sign-up" className="nav-link">
                  <span className="nav-icon">📝</span>
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
