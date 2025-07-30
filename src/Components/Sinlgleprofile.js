import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Singleprofile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${id}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) return <div className="container mt-4">Loading profile...</div>;

  return (
    <div className="container mt-4">
      <h3>{profile.name}'s Profile</h3>
      <div className="card p-4">
        <img
          src={profile.image}
          alt={profile.name}
          style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "10px", marginBottom: "15px" }}
        />
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>City:</strong> {profile.city}</p>
        <p><strong>Height:</strong> {profile.height}</p>
        <p><strong>Job:</strong> {profile.job}</p>
        <p><strong>Type:</strong> {profile.type}</p>
      </div>
    </div>
  );
}

export default Singleprofile;
