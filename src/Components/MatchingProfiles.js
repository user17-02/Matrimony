import React, { useEffect, useState } from "react";
import axios from "axios";

const MatchingProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [matchType, setMatchType] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT token
        const userId = localStorage.getItem("userId"); // Logged-in user ID

        if (!token || !userId) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/match/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const matches = res.data.profiles || [];
        setMatchType(res.data.matchType || "");

        if (matches.length === 0) {
          setMessage(res.data.message || "No matching profiles found");
        }

        setProfiles(matches);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <p className="loading">Loading profiles...</p>;
  if (error) return <p className="error">{error}</p>;
  if (profiles.length === 0) return <p className="no-profiles">{message}</p>;

  return (
    <div className="profiles-container">
      {matchType && profiles.length > 0 && (
        <p className="match-type">
          <strong>Match Type:</strong>{" "}
          {matchType === "exact"
            ? "Exact Match"
            : matchType === "partial-age-gender"
            ? "Partial Match (Age + Gender)"
            : "Close Matches"}
        </p>
      )}

      <div className="profiles-grid">
        {profiles.map((profile) => (
          <div key={profile._id} className="profile-card">
            <img
              src={profile.image || "/default-profile.png"}
              alt={profile.name || profile.username}
              className="profile-image"
            />
            <div className="profile-info">
              <h3>{profile.name || profile.username}</h3>
              <p><strong>Age:</strong> {profile.age}</p>
              <p><strong>City:</strong> {profile.city}</p>
              <p><strong>Height:</strong> {profile.height} cm</p>
              <p><strong>Profession:</strong> {profile.profession}</p>
              {profile.hobbies && profile.hobbies.length > 0 && (
                <p><strong>Hobbies:</strong> {profile.hobbies.join(", ")}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchingProfiles;
