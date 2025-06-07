import hero from './images/Herosection.jpg'
import logo from './images/Logo.png'
import Home from './Components/home'
import Login from './Components/login'
import Signup from './Components/signup'
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <Router> 
        {/* <!-- Top Info Bar --> */}
  <div class="info">
    <span><i class="fa fa-phone"></i> 9865678990</span>
    <span><i class="fa fa-envelope"></i> info@gmail.com</span>
  </div>

  {/* <!-- Navigation --> */}
  <nav class="navbar">
    <div class="logo">
      <img src={logo} alt="Logo" />
    </div>
    <div class="menu">
                <Link to="/">Home</Link>
                <Link to="/About Us">About Us</Link>
                <Link to="/Service">Service</Link>
                <Link to="/Review">Review</Link>
                <Link to="/Login">Login</Link>
            </div>
             </nav>
        
        <Routes>
          <Route path="/" element={<Home />}/> 
           <Route path="/login" element={<Login />}/> 
           <Route path="/signup" element={<Signup />} />
          </Routes>
        
    
    
    </Router>
  );
}

export default App;
