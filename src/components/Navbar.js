import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar-bg">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <h2>TP Music Store</h2>
        </Link>
        <ul>
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/albums" className="navbar-link">
            Albums
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
