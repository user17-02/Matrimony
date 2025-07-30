// src/Pages/ChatPage.js
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatPage = () => {
  const { id: userId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    const fetchChatUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setChatUser(res.data);
      } catch (err) {
        console.error("Failed to load chat user", err.message);
      }
    };

    const fetchMessages = async () => {
      if (!currentUser) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/message/${currentUser._id}/${userId}`
        );
        setMessages(res.data);
        scrollToBottom();
      } catch (err) {
        console.error("Failed to load messages", err.message);
      }
    };

    const markMessagesAsSeen = async () => {
      if (!currentUser) return;
      try {
        await axios.put("http://localhost:5000/api/message/mark-seen", {
          sender: userId,
          receiver: currentUser._id,
        });
      } catch (err) {
        console.error("Failed to mark messages as seen", err.message);
      }
    };

    const roomId = [currentUser?._id, userId].sort().join("_");
    socket.emit("joinRoom", roomId);

    fetchChatUser();
    fetchMessages();
    markMessagesAsSeen();

    socket.on("receiveMessage", (msg) => {
      if (
        (msg.sender === userId && msg.receiver === currentUser._id) ||
        (msg.sender === currentUser._id && msg.receiver === userId)
      ) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
        if (msg.sender === userId) {
          markMessagesAsSeen();
        }
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [currentUser, userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUser) return;

    const messageData = {
      sender: currentUser._id,
      receiver: userId,
      text: newMessage,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/message", messageData);
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
      scrollToBottom();

      const roomId = [currentUser._id, userId].sort().join("_");
      socket.emit("sendMessage", { roomId, message: res.data });
    } catch (err) {
      console.error("Send message failed", err.message);
    }
  };

  return (
    <div className="chat-container" style={styles.container}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Chat with {chatUser ? chatUser.name : "Loading..."}
      </h3>

      <div className="chat-box" style={styles.chatBox}>
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

      <div className="chat-input" style={styles.inputContainer}>
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
  messageText: {
    margin: 0,
    fontSize: "14px",
  },
  timestamp: {
    fontSize: "11px",
    marginTop: "5px",
    display: "block",
    textAlign: "right",
  },
  inputContainer: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  sendButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
