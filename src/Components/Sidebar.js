import React from "react";
import { Link } from "react-router-dom";
import Girl from "../images/Girl.jpg";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="profile-section">
        <img src={Girl} alt="Profile" />
        <h5>User Name</h5>
        <p>Member</p>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="">
              <i className="fas fa-home"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="profile">
              <i className="fas fa-user"></i> Profile
            </Link>
          </li>
          <li>
            <Link to="settings">
              <i className="fas fa-cog"></i> Settings
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="fas fa-sign-out-alt"></i> Log out
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
