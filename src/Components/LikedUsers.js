import React, { useEffect, useState } from "react";
import axios from "axios";

const LikedUsers = () => {
  const [likedUsers, setLikedUsers] = useState([]);
  const [refresh, setRefresh] = useState(false); // 👈 trigger to reload
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchLikedUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/likes/sent/${currentUser._id}`
        );
        setLikedUsers(res.data);
      } catch (err) {
        console.error("Error fetching liked users:", err);
      }
    };

    fetchLikedUsers();
  }, [refresh]); // 👈 runs every time refresh changes

  const handleUnlike = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/likes/unlike`, {
        data: {
          interestFrom: currentUser._id,
          interestTo: userId,
        },
      });
      setRefresh((prev) => !prev); // 👈 trigger re-fetch
    } catch (err) {
      console.error("Failed to unlike user", err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Users You Liked 💖</h3>
      {likedUsers.length === 0 ? (
        <p>You haven't liked anyone yet.</p>
      ) : (
        <div className="row">
          {likedUsers.map((user) => (
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
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleUnlike(user._id)}
                >
                  Unlike
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedUsers;
