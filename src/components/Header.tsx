import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
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
            <Link to="/new-post" className="nav-link">
              <span className="nav-icon">✏️</span>
              New Post
            </Link>
            <Link to="/settings" className="nav-link">
              <span className="nav-icon">⚙️</span>
              Settings
            </Link>
            <div className="user-info">
              <span className="nav-icon">👤</span>
              <span className="username">guest</span>
            </div>
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
