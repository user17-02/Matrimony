import React, { useEffect, useState } from "react";
import axios from "axios";

const MyRequests = () => {
  const [sentRequests, setSentRequests] = useState([]);
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

        const sent = requestsRes.data.filter(
          (r) => r.interestFrom === userId
        );
        setSentRequests(sent);
      } catch (error) {
        console.error("Error fetching sent requests:", error);
      }
    };

    fetchData();
  }, [userId]);

  const getUser = (id) => allUsers.find((u) => u._id === id);

  return (
    <div className="container mt-4">
      <h3>My Sent Interests</h3>
      {sentRequests.length === 0 ? (
        <p>You haven't sent any interests yet.</p>
      ) : (
        <div className="row">
          {sentRequests.map((req) => {
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
                  <p>
                    <strong>Status:</strong>{" "}
                    {req.status === "accepted" ? "Accepted ✅" :
                     req.status === "denied" ? "Denied ❌" :
                     "Pending ⏳"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
