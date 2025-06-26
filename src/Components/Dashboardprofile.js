import React from "react";
import Girl from "../images/Girl.jpg";

function DashboardProfile() {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Profile Status</h2>

      <div className="dashboard-content">
        <div className="profile-card">
          <img src={Girl} alt="Profile Banner" className="profile-image" />
          <div className="edit-button">EDIT PROFILE</div>
        </div>

        <div className="stats-card">
          <h4 className="stats-title">Profile completion</h4>
          <div className="completion-circle">90%</div>
          <ul className="stats-list">
            <li><span>❤️ Likes</span><span>12</span></li>
            <li><span>👁️ Views</span><span>12</span></li>
            <li><span>🤝 Interests</span><span>12</span></li>
            <li><span>🔗 Clicks</span><span>12</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardProfile;
