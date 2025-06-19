import hero from './images/Herosection.jpg'
import logo from './images/Logo.png'
import Home from './Components/home'
import Login from './Components/login'
import Signup from './Components/signup'
import Profilecard from './Components/Profilecard'
import Editprofile from'./Components/Editprofile'
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
                <Link to="/Review">Review</Link>
                <Link to="/Login">Login</Link>
            </div>
             </nav>
        
        <Routes>
          <Route path="/" element={<Home />}/> 
           <Route path="/login" element={<Login />}/> 
           <Route path="/signup" element={<Signup />} />
           <Route path="/Profiles" element={ <Profilecard/>} />
           <Route path="/Service" element={ <Editprofile/>} />

          </Routes>
          </div>
      
    </Router>
    
   
  );
}

export default App;
