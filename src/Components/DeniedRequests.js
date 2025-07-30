import React, { useEffect, useState } from "react";
import axios from "axios";

const Denied = () => {
  const [deniedList, setDeniedList] = useState([]);
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

        const denied = requestsRes.data.filter(
          (r) => r.interestFrom === userId && r.status === "denied"
        );
        setDeniedList(denied);
      } catch (error) {
        console.error("Error fetching denied interests:", error);
      }
    };

    fetchData();
  }, [userId]);

  const getUser = (id) => allUsers.find((u) => u._id === id);

  return (
    <div className="container mt-4">
      <h3>Denied Requests</h3>
      {deniedList.length === 0 ? (
        <p>No denied interests yet.</p>
      ) : (
        <div className="row">
          {deniedList.map((req) => {
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
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>City:</strong> {user.city}</p>
                  <p><strong>Status:</strong> Denied ❌</p>
                  <p style={{ fontWeight: "bold", color: "red" }}>
                    Your interest was denied by this profile.
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

export default Denied;
