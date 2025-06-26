import '@fortawesome/fontawesome-free/css/all.min.css';
import hero from './images/Herosection.jpg'
import logo from './images/Logo.png'
import Home from './Components/home'
import Login from './Components/login'
import Signup from './Components/signup'
import Profilecard from './Components/Profilecard'
import Editprofile from'./Components/Editprofile'
import Dashboard from './Components/Dashboard'
import Dashboardhome from './Components/Dashboardhome'
import Dashboardprofile from './Components/Dashboardprofile'
import DashboardSettings from './Components/Dashboardsettings'




import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom'

import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [Profiles,setProfiles] = useState([]);

  return (
   
    
    <Router> 
        {/* <!-- Top Info Bar --> */}
        <div>
  <div className="info">
    <span><i class="fa fa-phone"></i> 9865678990</span>
    <span><i class="fa fa-envelope"></i> info@gmail.com</span>
  </div>

  {/* <!-- Navigation --> */}
  <nav className="navbar">
    <div className="logo">
      <img src={logo} alt="Logo" />
    </div>
    <div className="menu">
                <Link to="/">Home</Link>
                <Link to="/Profiles">Profiles</Link>
                <Link to="/Service">Service</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/Login">Login</Link>
            </div>
             </nav>
        
        <Routes>
          <Route path="/" element={<Home />}/> 
           <Route path="/login" element={<Login />}/> 
           <Route path="/signup" element={<Signup />} />
           <Route path="/Profiles" element={ <Profilecard/>} />
           <Route path="/Service" element={ <Editprofile/>} />
          
            <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Dashboardhome />} />
          <Route path="profile" element={<Dashboardprofile />} />
          <Route path="settings" element={<DashboardSettings/>}/>
        </Route>

          </Routes>
          </div>
      
    </Router>
    
   
  );
}

export default App;
