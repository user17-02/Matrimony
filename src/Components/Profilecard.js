import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // ✅ Redirect if not logged in
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load user profile:", err);
      }
    };

    fetchUser();
  }, [userId, navigate]);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="container mt-4">
      <h3>Your Profile</h3>
      <div className="card p-3">
        {user.image && (
          <img
            src={user.image}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          />
        )}
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>City:</strong> {user.city}</p>
        <p><strong>Height:</strong> {user.height}</p>
        <p><strong>Job:</strong> {user.job}</p>
        <p><strong>Account Type:</strong> {user.type}</p>

        <button className="btn btn-primary mt-2" onClick={() => navigate("/Editprofile")}>
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
