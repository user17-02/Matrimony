import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Accepted = () => {
  const [sentAccepted, setSentAccepted] = useState([]);
  const [receivedAccepted, setReceivedAccepted] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, requestsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/user"),
          axios.get("http://localhost:5000/api/requests"),
        ]);

        setAllUsers(usersRes.data);

        // ✅ Grouped Accepted Requests
        const sent = requestsRes.data.filter(
          (r) => r.interestFrom === userId && r.status === "accepted"
        );
        const received = requestsRes.data.filter(
          (r) => r.interestTo === userId && r.status === "accepted"
        );

        setSentAccepted(sent);
        setReceivedAccepted(received);
      } catch (error) {
        console.error("Error fetching accepted interests:", error);
      }
    };

    fetchData();
  }, [userId]);

  const getUser = (id) => allUsers.find((u) => u._id === id);

  return (
    <div className="container mt-4">
      <h3>Accepted Requests</h3>

      {/* ✅ Sent Requests That Got Accepted */}
      <h5 className="mt-4">Requests You Sent (and were accepted):</h5>
      {sentAccepted.length === 0 ? (
        <p>No accepted interests sent yet.</p>
      ) : (
        <div className="row">
          {sentAccepted.map((req) => {
            const user = getUser(req.interestTo);
            if (!user) return null;

            return (
              <div className="col-md-4 mb-3" key={req._id}>
                <div className="card p-3 shadow-sm">
                  {user.image && (
                    <img
                      src={user.image}
                      alt={user.name}
                      style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>City:</strong> {user.city}</p>
                  <p><strong>Status:</strong> Accepted ✅</p>
                  <p style={{ fontWeight: "bold", color: "green" }}>
                    Your interest was accepted by this profile.
                  </p>
                  <Link to={`/chat/${user._id}`}>
                    <button className="btn btn-primary w-100">Chat Now</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ Requests You Accepted */}
      <h5 className="mt-4">Requests You Accepted:</h5>
      {receivedAccepted.length === 0 ? (
        <p>No requests accepted by you yet.</p>
      ) : (
        <div className="row">
          {receivedAccepted.map((req) => {
            const user = getUser(req.interestFrom);
            if (!user) return null;

            return (
              <div className="col-md-4 mb-3" key={req._id}>
                <div className="card p-3 shadow-sm">
                  {user.image && (
                    <img
                      src={user.image}
                      alt={user.name}
                      style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>City:</strong> {user.city}</p>
                  <p><strong>Status:</strong> Accepted ✅</p>
                  <p style={{ fontWeight: "bold", color: "green" }}>
                    You accepted this profile's interest.
                  </p>
                  <Link to={`/chat/${user._id}`}>
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
