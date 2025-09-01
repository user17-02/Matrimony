import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatPage = () => {
  const { id: chatUserId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Load current logged-in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const token = localStorage.getItem("token");

    // Fetch chat user with token for auth
    const fetchChatUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${chatUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChatUser(res.data);
      } catch (err) {
        console.error("Failed to load chat user:", err.response?.data?.message || err.message);
      }
    };

    // Fetch messages between current user and chat user
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/message/${currentUser._id}/${chatUserId}`
        );
        setMessages(res.data);
        scrollToBottom();
      } catch (err) {
        console.error("Failed to load messages:", err.response?.data?.message || err.message);
      }
    };

    // Mark messages as seen
    const markMessagesAsSeen = async () => {
      try {
        await axios.put("http://localhost:5000/api/message/mark-seen", {
          sender: chatUserId,
          receiver: currentUser._id,
        });
      } catch (err) {
        console.error("Failed to mark messages as seen:", err.response?.data?.message || err.message);
      }
    };

    fetchChatUser();
    fetchMessages();
    markMessagesAsSeen();

    // Join socket room
    const roomId = [currentUser._id, chatUserId].sort().join("_");
    socket.emit("joinRoom", roomId);

    // Listen for incoming messages
    socket.on("receiveMessage", (msg) => {
      if (
        (msg.sender === chatUserId && msg.receiver === currentUser._id) ||
        (msg.sender === currentUser._id && msg.receiver === chatUserId)
      ) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
        if (msg.sender === chatUserId) markMessagesAsSeen();
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [currentUser, chatUserId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUser) return;

    const messageData = {
      sender: currentUser._id,
      receiver: chatUserId,
      text: newMessage,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/message", messageData);
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
      scrollToBottom();

      const roomId = [currentUser._id, chatUserId].sort().join("_");
      socket.emit("sendMessage", { roomId, message: res.data });
    } catch (err) {
      console.error("Send message failed:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Chat with {chatUser ? chatUser.name : "Loading..."}
      </h3>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => {
          const isSent = msg.sender === currentUser?._id;
          const time = new Date(msg.createdAt).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={index}
              style={{
                ...styles.message,
                alignSelf: isSent ? "flex-end" : "flex-start",
                backgroundColor: isSent ? "#dcf8c6" : "#f1f0f0",
              }}
            >
              <p style={styles.messageText}>{msg.text}</p>
              <small style={styles.timestamp}>
                {time}
                {isSent && (
                  <span style={{ marginLeft: "8px", color: msg.seen ? "green" : "gray" }}>
                    {msg.seen ? "✓✓ Seen" : "✓ Sent"}
                  </span>
                )}
              </small>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  chatBox: {
    height: "500px",
    border: "1px solid #ccc",
    padding: "10px",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
  },
  message: {
    maxWidth: "70%",
    padding: "10px",
    borderRadius: "12px",
    wordWrap: "break-word",
  },
  messageText: { margin: 0, fontSize: "14px" },
  timestamp: { fontSize: "11px", marginTop: "5px", display: "block", textAlign: "right" },
  inputContainer: { marginTop: "10px", display: "flex", gap: "10px" },
  input: { flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc" },
  sendButton: { padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" },
};
