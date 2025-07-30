import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <NavLink
  to="/dashboard"
  end
  className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
>
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

<NavLink to="/dashboard/liked-users" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
  Liked Me
</NavLink>

      </div>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
