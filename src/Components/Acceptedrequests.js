import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Accepted = () => {
  const [acceptedList, setAcceptedList] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); // JWT token
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccepted = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/requests/accepted/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAcceptedList(res.data);
      } catch (error) {
        console.error("Error fetching accepted interests:", error);
        if (error.response?.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.clear();
          navigate("/login");
        }
      }
    };

    if (userId && token) {
      fetchAccepted();
    }
  }, [userId, token, navigate]);

  return (
    <div className="container mt-4">
      <h3>Accepted Requests</h3>

      {acceptedList.length === 0 ? (
        <p>No accepted requests yet.</p>
      ) : (
        <div className="row">
          {acceptedList.map((req) => {
            const otherUser =
              req.interestFrom?._id === userId ? req.interestTo : req.interestFrom;

            return (
              <div className="col-md-4 mb-3" key={req._id}>
                <div className="card p-3 shadow-sm">
                  {otherUser?.image && (
                    <img
                      src={otherUser.image}
                      alt={otherUser.name}
                      style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "8px" }}
                    />
                  )}
                  <p><strong>Name:</strong> {otherUser?.name}</p>
                  <p><strong>City:</strong> {otherUser?.city}</p>
                  <p><strong>Status:</strong> Accepted ✅</p>
                  <p style={{ fontWeight: "bold", color: "green" }}>
                    You are now connected with this profile.
                  </p>
                  <Link to={`/chat/${otherUser?._id}`}>
                    <button className="btn btn-primary w-100">Chat Now</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Accepted;
