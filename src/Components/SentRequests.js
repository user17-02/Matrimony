import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sent = () => {
  const [sentList, setSentList] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/requests/sent/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSentList(res.data);
      } catch (error) {
        console.error("Error fetching sent interests:", error);
        if (error.response?.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.clear();
          navigate("/login");
        }
      }
    };

    if (userId && token) fetchData();
  }, [userId, token, navigate]);

  return (
    <div className="container mt-4">
      <h3>My Sent Requests</h3>
      {sentList.length === 0 ? (
        <p>No requests sent yet.</p>
      ) : (
        <div className="row">
          {sentList.map((req) => {
            const user = req.interestTo;
            if (!user) return null;

            return (
              <div className="col-md-4 mb-3" key={req._id}>
                <div className="card p-3 shadow-sm">
                  {user.image && (
                    <img
                      src={user.image}
                      alt={user.name}
                      style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "8px" }}
                    />
                  )}
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>City:</strong> {user.city}</p>
                  <p><strong>Status:</strong> {req.status}</p>
                  <p style={{ fontWeight: "bold", color: "#555" }}>You sent interest to this profile.</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Sent;
