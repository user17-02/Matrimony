import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
