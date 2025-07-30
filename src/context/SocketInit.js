import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";

function SocketInit({ userId, onNotification }) {
  const socket = useSocket();

  useEffect(() => {
    if (socket.current) {
      socket.current.on("getNotification", (data) => {
        if (onNotification) {
          onNotification(data);
        }
      });
    }
  }, [socket, onNotification]);

  return null;
}

export default SocketInit;
