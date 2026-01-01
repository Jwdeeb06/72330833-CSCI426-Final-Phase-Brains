import React, { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import axios from "axios";
import "../styles/AdminDashboard.css";
//used under for the welcome of the user to get the name
function AdminDashboard() {
  const { user } = useAuth();
  const [coursesCount, setCoursesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  //the API-base for Render hosted backend
  const API_BASE = "https://seven2330833-csci426-final-phase-brains.onrender.com/api";

  //the API-base for localhosted backend
  // const API_BASE = "http://localhost:5000/api";

  useEffect(() => {
    // fetch courses count
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE}/courses`);
        setCoursesCount(res.data.length);
      } catch (err) {
        console.error(err);
      }
    };

    // fetch users count
    const fetchRegistrations = async () => {
      try {
        const res = await axios.get(`${API_BASE}/registrations`);
        setUsersCount(res.data.length);
      } catch (err) {
        console.error(err);
      }
    };

    // fetch new/unread messages count
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_BASE}/messages?readed=false`);
        setNewMessagesCount(res.data.length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
    fetchRegistrations();
    fetchMessages();
  }, []);

  return (
    <div className="admin-dashboard-page">
      <h1>Welcome, {user.username} 👋</h1>
      <p>This is your Admin Dashboard.</p>

      <div className="admin-dashboard-cards">
        <div className="admin-card">
          <h3>📚 Courses</h3>
          <p>{coursesCount} Active</p>
        </div>
        <div className="admin-card">
          <h3>👩‍🎓 Students</h3>
          <p>{usersCount} Registered</p>
        </div>
        <div className="admin-card">
          <h3>✉️ Messages</h3>
          <p>{newMessagesCount} New</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
