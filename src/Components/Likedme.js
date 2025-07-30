// src/pages/LikedMe.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function LikedMe() {
  const [likedByUsers, setLikedByUsers] = useState([]);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchLikedMe = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/likes/liked-me/${currentUserId}`);
        const userRes = await axios.get("http://localhost:5000/api/user");

        const likedByProfiles = userRes.data.filter((user) =>
          data.likedBy.includes(user._id)
        );

        setLikedByUsers(likedByProfiles);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLikedMe();
  }, [currentUserId]);

  return (
    <div className="container mt-4">
      <h3>Profiles Who Liked Me ❤️</h3>
      <div className="row">
        {likedByUsers.length === 0 && <p>No one has liked you yet.</p>}

        {likedByUsers.map((user) => (
          <div className="col-md-4 mb-4" key={user._id}>
            <div className="card p-3 shadow">
              {user.image && (
                <img
                  src={user.image}
                  alt={user.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
              <h5 className="mt-2">{user.name}</h5>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>City:</strong> {user.city}</p>
              <p><strong>Job:</strong> {user.job}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LikedMe;
