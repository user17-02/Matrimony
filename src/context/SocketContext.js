import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, userId }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    // ✅ Only emit joinRoom AFTER connection established and userId exists
    if (userId) {
      newSocket.on("connect", () => {
        console.log("✅ Connected to Socket.IO:", newSocket.id);
        newSocket.emit("joinRoom", userId);
      });
    }

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (data) => {
      console.log("🔔 Notification received:", data);
      setNotifications((prev) => [...prev, data]);
    };

    socket.on("newNotification", handleNotification);

    return () => {
      socket.off("newNotification", handleNotification);
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};
