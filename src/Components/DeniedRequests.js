import React, { useEffect, useState } from "react";
import axios from "axios";

const Denied = () => {
  const [deniedList, setDeniedList] = useState([]);
  const userId = localStorage.getItem("userId"); // logged-in user

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/requests/denied/${userId}`);
        setDeniedList(res.data);
      } catch (error) {
        console.error("Error fetching denied interests:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="container mt-4">
      <h3>Denied Requests</h3>
      {deniedList.length === 0 ? (
        <p>No denied interests yet.</p>
      ) : (
        <div className="row">
          {deniedList.map((req) => {
            const user = req.user; // ✅ comes from backend

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
                  {req.deniedBy === "me" ? (
                    <p style={{ fontWeight: "bold", color: "red" }}>
                      You denied this request.
                    </p>
                  ) : (
                    <p style={{ fontWeight: "bold", color: "red" }}>
                      Your request was denied by this user.
                    </p>
                  )}
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
