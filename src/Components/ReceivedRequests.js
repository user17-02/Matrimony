import React, { useEffect, useState } from "react";
import axios from "axios";

const Received = () => {
  const [receivedList, setReceivedList] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchReceived = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/requests/received/${userId}`);
        setReceivedList(res.data.filter((r) => r.status === "pending"));
      } catch (error) {
        console.error("Error fetching received interests:", error);
      }
    };

    fetchReceived();
  }, [userId]);

  const handleResponse = async (requestId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${requestId}`, { status });
      setReceivedList((prev) =>
        prev.filter((req) => req._id !== requestId)
      );
      alert(`Interest ${status}`);
    } catch (error) {
      console.error("Error updating request:", error);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Received Interests</h3>
      {receivedList.length === 0 ? (
        <p>No pending interests received yet.</p>
      ) : (
        <div className="row">
          {receivedList.map((req) => (
            <div className="col-md-4 mb-3" key={req._id}>
              <div className="card p-3 shadow-sm">
                {req.interestFrom?.image && (
                  <img
                    src={req.interestFrom.image}
                    alt={req.interestFrom.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                )}
                <p><strong>Name:</strong> {req.interestFrom?.name}</p>
                <p><strong>City:</strong> {req.interestFrom?.city}</p>
                <p><strong>Status:</strong> Pending ⏳</p>

                <button
                  className="btn btn-success me-2"
                  onClick={() => handleResponse(req._id, "accepted")}
                >
                  Accept
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleResponse(req._id, "denied")}
                >
                  Deny
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Received;
