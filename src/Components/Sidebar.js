import { NavLink } from 'react-router-dom';
import { useSocket } from "../context/SocketContext";
 // 👈 import socket context


const Sidebar = () => {
  const { notifications } = useSocket(); // 👈 access live notifications

  return (
    <div className="sidebar">
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        Dashboard
      </NavLink>

      <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        My Profile
      </NavLink>

      <NavLink to="/dashboard/sent-requests" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        Sent Requests
      </NavLink>

      <NavLink to="/dashboard/received-requests" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        Received Requests
      </NavLink>

      <NavLink to="/dashboard/accepted-requests" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        Accepted Requests
      </NavLink>

      <NavLink to="/dashboard/denied-requests" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        Denied Requests
      </NavLink>

      <NavLink to="/dashboard/my-sent-requests" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        My Sent Requests
      </NavLink>

      <NavLink to="/dashboard/liked-me" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        Liked Me
      </NavLink>

      <NavLink to="/dashboard/liked-users" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        Users You Liked
      </NavLink>

      <NavLink to="/dashboard/notifications" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        Notifications
        {notifications.length > 0 && (
          <span className="notification-badge">{notifications.length}</span> // 👈 badge
        )}
      </NavLink>
    </div>
  );
};

export default Sidebar;
