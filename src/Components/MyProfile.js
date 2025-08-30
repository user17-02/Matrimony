import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const userId = storedUser ? JSON.parse(storedUser)._id : null;

  const fetchProfile = async () => {
    if (!userId || !token) {
      setMessage("User not logged in");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setMessage("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (!user) return <div className="container mt-4">{message || "No profile found"}</div>;

  const pref = user.partnerPreferences || {};

  return (
    <div className="container mt-4">
      <h3>My Profile</h3>
      <div className="card p-4">
        {user.image && (
          <img
            src={user.image}
            alt={user.name || "Profile"}
            style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "10px", marginBottom: "15px" }}
          />
        )}

        <div className="row">
          <div className="col-md-6">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>City:</strong> {user.city}</p>
            <p><strong>State:</strong> {user.state}</p>
            <p><strong>Country:</strong> {user.country}</p>
            <p><strong>Height:</strong> {user.height}</p>
            <p><strong>Weight:</strong> {user.weight}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Complexion:</strong> {user.complexion}</p>
            <p><strong>Body Type:</strong> {user.bodyType}</p>
            <p><strong>Marital Status:</strong> {user.maritalStatus}</p>
            <p><strong>Diet:</strong> {user.diet}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Profession:</strong> {user.profession}</p>
            <p><strong>Qualification:</strong> {user.qualification}</p>
            <p><strong>Company:</strong> {user.company}</p>
            <p><strong>Income:</strong> {user.income}</p>
            <p><strong>Education Details:</strong> {user.educationDetails}</p>
            <p><strong>Religion:</strong> {user.religion}</p>
            <p><strong>Caste:</strong> {user.caste}</p>
            <p><strong>Mother Tongue:</strong> {user.motherTongue}</p>
            <p><strong>Smoking:</strong> {user.smoking}</p>
            <p><strong>Drinking:</strong> {user.drinking}</p>
            <p><strong>Hobbies:</strong> {Array.isArray(user.hobbies) ? user.hobbies.join(", ") : user.hobbies}</p>
            <p><strong>Interests:</strong> {Array.isArray(user.interests) ? user.interests.join(", ") : user.interests}</p>
            <p><strong>About Me:</strong> {user.aboutMe}</p>
          </div>
        </div>

        <hr />
        <h5>Partner Preferences</h5>
        <div className="row">
          <div className="col-md-6">
            <p><strong>Age Range:</strong> {Array.isArray(pref.ageRange) ? pref.ageRange.join("-") : pref.ageRange}</p>
            <p><strong>Height Range:</strong> {Array.isArray(pref.heightRange) ? pref.heightRange.join("-") : pref.heightRange}</p>
            <p><strong>Complexion:</strong> {pref.complexion}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Profession:</strong> {pref.profession}</p>
            <p><strong>Religion:</strong> {pref.religion}</p>
            <p><strong>Caste:</strong> {pref.caste}</p>
            <p><strong>Location:</strong> {pref.location}</p>
          </div>
        </div>

        <button className="btn btn-primary mt-3" onClick={() => navigate("/editprofile?t=" + Date.now())}>
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
