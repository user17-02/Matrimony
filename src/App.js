import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import hero from './images/Herosection.jpg';
import logo from './images/Logo.png';

import Home from './Components/home';
import Login from './Components/login';
import Signup from './Components/signup';
import Profilecard from './Components/Profilecard';
import Editprofile from './Components/Editprofile';
import Dashboard from './Components/Dashboard';
import Interest from './Components/Interest';
import Allprofile from './Components/Allprofile';
import Requireauth from './Components/Requireauth';
import MyRequests from './Components/MyRequests';
import Acceptedrequests from './Components/Acceptedrequests';
import DeniedRequests from './Components/DeniedRequests';
import Sent from './Components/SentRequests';
import Received from './Components/ReceivedRequests';
import Overview from './Components/Overview';
import Singleprofile from './Components/Sinlgleprofile';
import LikedUsers from './Components/LikedUsers';
import ChatPage from './Components/ChatPage';
import Likedme from './Components/Likedme';
import Notifications from './Components/Notifications';
import SocketInit from './context/SocketInit';
import {SocketProvider} from './context/SocketContext';
import MyProfile from './Components/MyProfile';
import ChangePassword from './Components/ChangePassword';
import ViewDetails from './Components/ViewDetails';
import ProtectedRoute from "./Components/ProtectedRoute";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [currentUserDetails, setCurrentUserDetails] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.username) {
          setUser(parsedUser);
          axios
            .get(`http://localhost:5000/api/user/${parsedUser._id}`)
            .then((res) => setCurrentUserDetails(res.data))
            .catch((err) => console.error("Failed to fetch current user", err));
        } else {
          localStorage.removeItem("user");
        }
      }
    } catch (e) {
      localStorage.removeItem("user");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setCurrentUserDetails(null);
    window.location.href = "/login";
  };

  return (
    <SocketProvider userId={user?._id}>
      <Router>
        <div>
          <SocketInit userId={user?._id} />
          {/* Info Bar */}
          <div className="info">
            <span><i className="fa fa-phone"></i> 9865678990</span>
            <span><i className="fa fa-envelope"></i> info@gmail.com</span>
          </div>

          {/* Navigation */}
          <nav className="navbar">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="menu">
              <Link to="/">Home</Link>
              <Link to="/profiles">Profiles</Link>
              <Link to="/Service">Service</Link>
              <Link to="/dashboard">Dashboard</Link>
              
              {user ? (
                <>
                  <span style={{ marginLeft: "10px" }}>{user.username}</span>
                  <button
                    onClick={handleLogout}
                    style={{
                      marginLeft: "10px",
                      background: "none",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
          </nav>
      

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Service" element={<Interest />} />
            <Route path="/editprofile" element={<Requireauth><Editprofile /></Requireauth>} />
            <Route path="/profiles" element={<Requireauth><Allprofile /></Requireauth>} />
            <Route path="/profile/:id" element={<Requireauth><Singleprofile /></Requireauth>} />
            <Route path="/chat/:id" element={<Requireauth><ChatPage /></Requireauth>} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/view/:id" element={<ViewDetails />} />     
              

            {/* Dashboard with nested routes */}
            <Route path="/dashboard" element={<Requireauth><Dashboard /></Requireauth>}>
              <Route index element={<Overview />} />
              <Route path="profile" element={<MyProfile />} />
              <Route path="sent-requests" element={<Sent />} />
              <Route path="received-requests" element={<Received />} />
              <Route path="accepted-requests" element={<Acceptedrequests />} />
              <Route path="denied-requests" element={<DeniedRequests />} />
              <Route path="liked-users" element={<LikedUsers />} />
              <Route path="liked-me" element={<Likedme />} />
              <Route path="notifications" element={<Notifications />} />

            </Route>
          </Routes>
        </div>
      </Router>
    </SocketProvider>
  );
}

export default App;