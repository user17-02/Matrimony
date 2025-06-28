import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function Dashboard() {
    return(
        <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div> 
    );
}
export default Dashboard;

