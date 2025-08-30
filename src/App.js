import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import { ToastContainer } from "react-toastify";
import logo from './images/Logo.png';

import Home from './Components/home';
import Login from './Components/login';
import Signup from './Components/signup';
import Editprofile from './Components/Editprofile';
import Dashboard from './Components/Dashboard';
import Interest from './Components/Interest';
import Allprofile from './Components/Allprofile';
import Requireauth from './Components/Requireauth';
import MyProfile from './Components/MyProfile';
import ChangePassword from './Components/ChangePassword';
import ViewDetails from './Components/ViewDetails';
import Singleprofile from './Components/Sinlgleprofile';
import ChatPage from './Components/ChatPage';
import Overview from './Components/Overview';
import Acceptedrequests from './Components/Acceptedrequests';
import DeniedRequests from './Components/DeniedRequests';
import Sent from './Components/SentRequests';
import Received from './Components/ReceivedRequests';
import LikedUsers from './Components/LikedUsers';
import Likedme from './Components/Likedme';
import Notifications from './Components/Notifications';
import SocketInit from './context/SocketInit';
import { SocketProvider } from './context/SocketContext';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Fetch current user from API using token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        axios
          .get(`http://localhost:5000/api/user/${parsedUser._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {
            console.error("Failed to fetch current user", err);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          })
          .finally(() => setLoadingUser(false));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setLoadingUser(false);
      }
    } else {
      setLoadingUser(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  if (loadingUser) return <p>Loading...</p>; // wait until user data is ready

  return (
    <> 
    <ToastContainer position="top-right" autoClose={3000} />
    <SocketProvider userId={user?._id}>
      <Router>
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
          <Route
            path="/editprofile"
            element={
              <Requireauth user={user}>
                <Editprofile user={user} setUser={setUser} />
              </Requireauth>
            }
          />
          <Route
            path="/profiles"
            element={
              <Requireauth user={user}>
                <Allprofile user={user} />
              </Requireauth>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <Requireauth user={user}>
                <Singleprofile user={user} />
              </Requireauth>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <Requireauth user={user}>
                <ChatPage user={user} />
              </Requireauth>
            }
          />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/view/:id" element={<ViewDetails />} />

          {/* Dashboard */}
          <Route
            path="/dashboard/*"
            element={
              <Requireauth user={user}>
                <Dashboard user={user} />
              </Requireauth>
            }
          >
            <Route index element={<Overview />} />
            <Route path="profile" element={<MyProfile user={user} />} />
            <Route path="sent-requests" element={<Sent user={user} />} />
            <Route path="received-requests" element={<Received user={user} />} />
            <Route path="accepted-requests" element={<Acceptedrequests user={user} />} />
            <Route path="denied-requests" element={<DeniedRequests user={user} />} />
            <Route path="liked-users" element={<LikedUsers user={user} />} />
            <Route path="liked-me" element={<Likedme user={user} />} />
            <Route path="notifications" element={<Notifications user={user} />} />
          </Route>
        </Routes>
      </Router>
    </SocketProvider>
    </>
  );
}

export default App;
