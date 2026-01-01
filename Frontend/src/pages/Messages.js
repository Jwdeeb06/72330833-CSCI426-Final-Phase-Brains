import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  //the API-base for Render hosted backend
  const API_BASE = "https://seven2330833-csci426-final-phase-brains.onrender.com/api";

  //the API-base for localhosted backend
  // const API_BASE = "http://localhost:5000/api";
  
  // fetch messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_BASE}/messages`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load messages");
      }
    };
    fetchMessages();
  }, []);

  // mark message as read
  const handleMarkRead = async (id) => {
    try {
      await axios.put(`${API_BASE}/messages/read/${id}`);
      setMessages(
        messages.map((m) => (m.id === id ? { ...m, is_readed: 1 } : m))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to mark message as read");
    }
  };

  // delete message
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      await axios.delete(`${API_BASE}/messages/delete/${id}`);
      setMessages(messages.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete message");
    }
  };

  return (
    <div className="messages-page">
      <h1>📩 Contact Messages</h1>
      <div className="table-container">
        <table className="messages-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={msg.id} className={msg.is_readed ? "read" : "unread"}>
                <td>{index + 1}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.content}</td>
                <td>{new Date(msg.date).toLocaleDateString()}</td>
                <td>
                  {!msg.is_readed && (
                    <button
                      className="mark-read-btn"
                      onClick={() => handleMarkRead(msg.id)}
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(msg.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
