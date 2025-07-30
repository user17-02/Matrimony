import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notifications/${user._id}`);
        setNotifications(res.data);
      } catch (err) {
        console.error("❌ Error fetching notifications:", err);
      }
    };

    if (user) fetchNotifications();
  }, [user]);

  const handleClick = async (notification) => {
    try {
      await axios.delete(`http://localhost:5000/api/notifications/${notification._id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== notification._id));
      navigate(`/chat/${notification.sender._id}`);
    } catch (err) {
      console.error("❌ Error handling notification click:", err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>🔔 Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifications.map((n, i) => (
            <li
              key={n._id}
              onClick={() => handleClick(n)}
              style={{
                marginBottom: "1rem",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              {n.sender?.image ? (
                <img
                  src={
                    n.sender.image.startsWith("data:image") || n.sender.image.startsWith("http")
                      ? n.sender.image
                      : `http://localhost:5000/${n.sender.image}`
                  }
                  alt="sender"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "#ccc",
                  }}
                />
              )}
              <div>
                <strong>{n.sender?.name || "Unknown User"}</strong>:{" "}
                {n.type === "message"
                  ? "📩 You have a new message!"
                  : "💌 You received an interest request!"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
