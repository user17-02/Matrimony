import React, { useEffect, useState } from "react";
import axios from "axios";

function Interests() {
  const userId = localStorage.getItem("userId");

  const [sent, setSent] = useState([]);
  const [receivedPending, setReceivedPending] = useState([]);
  const [receivedAccepted, setReceivedAccepted] = useState([]);
  const [receivedDenied, setReceivedDenied] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const [userRes, requestRes] = await Promise.all([
          axios.get("http://localhost:5000/api/user"),
          axios.get("http://localhost:5000/api/requests"),
        ]);

        const allUsers = userRes.data;
        const allRequests = requestRes.data;
        setUsers(allUsers);

        // Sent requests
        const sentRequests = allRequests.filter((r) => r.interestFrom === userId);
        const sentProfiles = allUsers.filter((u) =>
          sentRequests.some((r) => r.interestTo === u._id)
        );
        setSent(sentProfiles);

        // Received requests by status
        const pending = allRequests.filter(
          (r) => r.interestTo === userId && r.status === "pending"
        );
        const accepted = allRequests.filter(
          (r) => r.interestTo === userId && r.status === "accepted"
        );
        const denied = allRequests.filter(
          (r) => r.interestTo === userId && r.status === "denied"
        );

        setReceivedPending(pending);
        setReceivedAccepted(accepted);
        setReceivedDenied(denied);
      } catch (err) {
        console.error("Error fetching interests:", err);
      }
    };

    if (userId) fetchInterests();
  }, [userId]);

  const handleAction = async (requestId, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/requests/${requestId}`, {
        status,
      });

      // Remove the request from pending list
      setReceivedPending((prev) => prev.filter((r) => r._id !== requestId));

      if (status === "accepted") {
        const acceptedRequest = receivedPending.find((r) => r._id === requestId);
        setReceivedAccepted((prev) => [...prev, acceptedRequest]);
      } else {
        const deniedRequest = receivedPending.find((r) => r._id === requestId);
        setReceivedDenied((prev) => [...prev, deniedRequest]);
      }

      alert(`Interest ${status}`);
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status");
    }
  };

  const getUserById = (id) => users.find((u) => u._id === id);

  const renderUserCard = (user, extra) => (
    <div className="col-md-4 mb-4" key={user._id}>
      <div className="card p-3">
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
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>City:</strong> {user.city}</p>
        <p><strong>Age:</strong> {user.age}</p>
        {extra}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      {/* Sent Interests */}
      <h3 className="mb-3">Interests Sent</h3>
      {sent.length === 0 ? <p>No interests sent.</p> : (
        <div className="row">
          {sent.map((user) =>
            renderUserCard(user, <p className="text-success">You sent an interest.</p>)
          )}
        </div>
      )}

      {/* Received - Pending */}
      <h3 className="mt-5 mb-3">Interests Received (Pending)</h3>
      {receivedPending.length === 0 ? <p>No pending interests.</p> : (
        <div className="row">
          {receivedPending.map((req) => {
            const user = getUserById(req.interestFrom);
            if (!user) return null;

            return (
              <div className="col-md-4 mb-4" key={req._id}>
                <div className="card p-3">
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
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>City:</strong> {user.city}</p>
                  <p><strong>Age:</strong> {user.age}</p>
                  <p className="text-warning">This user sent you an interest.</p>

                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleAction(req._id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleAction(req._id, "denied")}
                  >
                    Deny
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Accepted */}
      <h3 className="mt-5 mb-3 text-success">Accepted Interests</h3>
      {receivedAccepted.length === 0 ? <p>No accepted interests.</p> : (
        <div className="row">
          {receivedAccepted.map((req) => {
            const user = getUserById(req.interestFrom);
            return user && renderUserCard(user, <p className="text-success">You accepted this profile.</p>);
          })}
        </div>
      )}

      {/* Denied */}
      <h3 className="mt-5 mb-3 text-danger">Denied Interests</h3>
      {receivedDenied.length === 0 ? <p>No denied interests.</p> : (
        <div className="row">
          {receivedDenied.map((req) => {
            const user = getUserById(req.interestFrom);
            return user && renderUserCard(user, <p className="text-danger">You denied this profile.</p>);
          })}
        </div>
      )}
    </div>
  );
}

export default Interests;
