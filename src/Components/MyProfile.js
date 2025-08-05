import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function MyProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${userId}`, {
          headers: { "Cache-Control": "no-cache" },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [userId, location.search]); // re-fetch on query changes (cache-busting)

  if (!user) return <div className="container mt-4">Loading your profile...</div>;

  const pref = user.partnerPreferences || {};

  return (
    <div className="container mt-4">
      <h3>My Profile</h3>
      <div className="card p-4">
        {user.image && (
          <img
            src={user.image}
            alt={user.name || "Profile"}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          />
        )}
        <div className="row">
          <div className="col-md-6">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Username:</strong> {user.username}</p>
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
            <p><strong>Marital Status:</strong> {user.maritalStatus}</p>
            <p><strong>Is Divorced:</strong> {user.isDivorced ? "Yes" : "No"}</p>
            <p><strong>Diet:</strong> {user.diet}</p>
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

        <button className="btn btn-primary mt-3" onClick={() => navigate("/Editprofile?t=" + Date.now())}>
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
