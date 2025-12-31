import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/NavBar.css";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useAuth } from "../components/AuthContext";

const NavBar = () => {
  //state for the defualt menu
  const [menuOpen, setMenuOpen] = useState(false);
  // logout in the admin navbar
  const { user, logout } = useAuth();
  //menu open and close
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // if admin
  if (user) {
    return (
      <aside className="admin-vertical-navbar">
        <div className="admin-logo">
          <img src={logo} alt="Logo" />
          <h3>Brains Admin</h3>
        </div>

        <ul className="admin-menu">
          <li>
            <Link to="/admindashboard">🏠 Dashboard</Link>
          </li>
          <li>
            <Link to="/addcourse">➕ Add Course</Link>
          </li>
          <li>
            <Link to="/adduser">👤 Add User</Link>
          </li>
          <li>
            <Link to="/registrations">📋 Registrations</Link>
          </li>
          <li>
            <Link to="/messages">✉️ Messages</Link>
          </li>
        </ul>

        <div className="admin-bottom">
          <p>👋 {user.username}</p>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>
    );
  }

  //if user
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? "✖" : <ReorderIcon style={{ fontSize: "32px" }} />}
      </button>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/menu" onClick={closeMenu}>
          Menu
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About
        </Link>
        <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
