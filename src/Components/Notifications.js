// src/Components/Notifications.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [allNotifications, setAllNotifications] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/notifications/${user._id}`
        );
        setAllNotifications(res.data);
      } catch (err) {
        console.error("❌ Error fetching notifications:", err);
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  return (
    <div>
      <h3>🔔 Notifications</h3>
      {allNotifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul>
          {allNotifications.map((n, i) => (
            <li key={i}>
              <strong>{n.sender}</strong>:{" "}
              {n.type === "message" ? "📩 You have a new message!" : n.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
